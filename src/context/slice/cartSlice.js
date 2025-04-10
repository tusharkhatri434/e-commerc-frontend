import { createSlice } from '@reduxjs/toolkit'

// const initialState = [{id:123,productId:1322142354,count:12}];
const initialState = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProducts: (state,action) => {
      const productSameID = state.find((item)=>item._id==action.payload._id);
      if(productSameID){
        if(action.payload.size===productSameID.size){
          console.log(JSON.parse(JSON.stringify(productSameID)));
           productSameID.count = productSameID.count+1;
           return ;
        }
      }
      state.push(action.payload);
    },
    removeProducts: (state,action) => {
      const idToRemove = action.payload.id;
      console.log(idToRemove)
      return state.filter((item) => item.id !== idToRemove);
    },
    productCountIncrement: (state, action) => {
      const { id, count } = action.payload;
      const product = state.find(item => item.id === id);
      if (product) {
        product.count = Number(count);
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProducts, removeProducts, productCountIncrement } = cartSlice.actions

// export const cartItems = (state) => state.cart.value;

export default cartSlice.reducer
