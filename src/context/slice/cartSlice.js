import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  fetchCartFromAPI, 
  addToCartAPI, 
  updateCartItemAPI, 
  removeFromCartAPI, 
  clearCartAPI 
} from '../../services/cartService';
import { toast } from 'react-toastify';

const initialState = {
  items: [],
  loading: false,
  error: null,
  syncing: false, // For optimistic updates
  lastFetched: null, // Timestamp to avoid unnecessary fetches
};

// Async Thunks

/**
 * Fetch cart from backend
 */
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const cartData = await fetchCartFromAPI(userId, token);
      return cartData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Add item to cart with optimistic update
 */
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, token, product }, { rejectWithValue, getState }) => {
    try {
      const cartData = await addToCartAPI(userId, token, product);
      toast.success('Added to cart!');
      return cartData;
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Update cart item quantity
 */
export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ userId, token, itemId, quantity }, { rejectWithValue }) => {
    try {
      const cartData = await updateCartItemAPI(userId, token, itemId, quantity);
      return cartData;
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Remove item from cart
 */
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, token, itemId }, { rejectWithValue }) => {
    try {
      const cartData = await removeFromCartAPI(userId, token, itemId);
      toast.success('Item removed from cart');
      return cartData;
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Clear entire cart
 */
export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      await clearCartAPI(userId, token);
      return { items: [] };
    } catch (error) {
      console.error('Failed to clear cart:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Helper function to normalize cart items from backend
const normalizeCartItem = (item) => ({
  id: item.itemId,
  itemId: item.itemId,
  _id: item.product._id || item.product,
  productId: item.product._id || item.product,
  name: item.name,
  image: Array.isArray(item.image) ? item.image : [item.image],
  size: item.size,
  count: item.quantity,
  quantity: item.quantity,
  price: item.price,
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local optimistic updates (will be synced later)
    addProductOptimistic: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === product._id && item.size === product.size
      );
      
      if (existingItem) {
        existingItem.count += 1;
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: `temp_${Date.now()}`,
          itemId: `temp_${Date.now()}`,
          _id: product._id,
          productId: product._id,
          name: product.name,
          image: product.image,
          size: product.size,
          count: 1,
          quantity: 1,
          price: product.price,
        });
      }
    },
    
    updateProductCountOptimistic: (state, action) => {
      const { id, count } = action.payload;
      const item = state.items.find(item => item.id === id || item.itemId === id);
      if (item) {
        item.count = Number(count);
        item.quantity = Number(count);
      }
    },
    
    removeProductOptimistic: (state, action) => {
      const idToRemove = action.payload.id;
      state.items = state.items.filter(
        (item) => item.id !== idToRemove && item.itemId !== idToRemove
      );
    },
    
    // Clear cart items locally
    clearCartLocal: (state) => {
      state.items = [];
    },
    
    // Reset error state
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        const cartData = action.payload;
        
        if (cartData && cartData.items && cartData.items.length > 0) {
          state.items = cartData.items.map(normalizeCartItem);
        } else {
          state.items = [];
        }
        
        state.lastFetched = Date.now();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Keep existing items on error
      })
      
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.syncing = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.syncing = false;
        const cartData = action.payload;
        
        if (cartData && cartData.items) {
          state.items = cartData.items.map(normalizeCartItem);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload;
      })
      
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.syncing = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.syncing = false;
        const cartData = action.payload;
        
        if (cartData && cartData.items) {
          state.items = cartData.items.map(normalizeCartItem);
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload;
      })
      
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.syncing = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.syncing = false;
        const cartData = action.payload;
        
        if (cartData && cartData.items) {
          state.items = cartData.items.map(normalizeCartItem);
        } else {
          // Cart is empty
          state.items = [];
        }
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload;
      })
      
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  addProductOptimistic, 
  updateProductCountOptimistic, 
  removeProductOptimistic, 
  clearCartLocal,
  clearError 
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartSyncing = (state) => state.cart.syncing;
export const selectCartError = (state) => state.cart.error;
export const selectCartItemCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.count, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + (item.price * item.count), 0);

export default cartSlice.reducer;
