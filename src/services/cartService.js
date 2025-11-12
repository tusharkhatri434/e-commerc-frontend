import { BASE_URL } from '../utils/url-config';

/**
 * Cart Service - Handles all cart-related API calls
 */

const getAuthHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});

/**
 * Fetch user's cart from backend
 */
export const fetchCartFromAPI = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/api/fetchcart/${userId}`, {
      method: 'GET',
      headers: getAuthHeaders(token)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to fetch cart');
    }

    return data.data; // Returns cart object with items array
  } catch (error) {
    console.error('Fetch cart error:', error);
    throw error;
  }
};

/**
 * Add item to cart in backend
 */
export const addToCartAPI = async (userId, token, cartItem) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/api/add-to-cart`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        userId,
        productId: cartItem._id,
        name: cartItem.name,
        image: cartItem.image?.[0] || cartItem.image,
        size: cartItem.size,
        quantity: cartItem.count || 1,
        price: cartItem.price
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to add to cart');
    }

    return data.data; // Returns updated cart
  } catch (error) {
    console.error('Add to cart error:', error);
    throw error;
  }
};

/**
 * Update cart item quantity
 */
export const updateCartItemAPI = async (userId, token, itemId, quantity) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/api/updatecart/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        itemId,
        quantity
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to update cart item');
    }

    return data.data; // Returns updated cart
  } catch (error) {
    console.error('Update cart error:', error);
    throw error;
  }
};

/**
 * Remove item from cart
 */
export const removeFromCartAPI = async (userId, token, itemId) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/api/deletecart/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        itemId
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to remove from cart');
    }

    return data.data; // Returns updated cart
  } catch (error) {
    console.error('Remove from cart error:', error);
    throw error;
  }
};

/**
 * Clear entire cart
 */
export const clearCartAPI = async (userId, token) => {
  try {
    const response = await fetch(`${BASE_URL}/v1/api/clearcart/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || 'Failed to clear cart');
    }

    return data;
  } catch (error) {
    console.error('Clear cart error:', error);
    throw error;
  }
};

