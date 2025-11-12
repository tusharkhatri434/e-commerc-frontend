import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCartItems, selectCartLoading } from "../context/slice/cartSlice";
import { IMG_URI } from "../utils/url-config";
import CartProductCard from "../components/CartProductCard";
import { NavLink } from "react-router-dom";

const Cart = () => {
      
   const dispatch = useDispatch();
   const cartProduct = useSelector(selectCartItems);
   const loading = useSelector(selectCartLoading);
   const lastFetched = useSelector((state) => state.cart.lastFetched);
   const { user, token } = useSelector((store) => store.auth);

   // Fetch cart from database when component mounts
   // Only fetch if not recently fetched (within last 30 seconds)
   useEffect(() => {
      if (user && token) {
         const now = Date.now();
         const thirtySeconds = 30 * 1000;
         
         // Fetch if never fetched OR last fetch was more than 30 seconds ago
         if (!lastFetched || (now - lastFetched) > thirtySeconds) {
            dispatch(fetchCart({ userId: user._id, token }));
         }
      }
   }, [dispatch, user, token, lastFetched]);

   const subTotal = useMemo(() => {
      let sum = 0;
      if (cartProduct.length > 0) {
         cartProduct.forEach((element) => {
            sum = sum + element.price * element.count;
         });
         return sum;
      }
      return sum;
   }, [cartProduct]);

   // Show loading state
   if (loading) {
      return (
         <div className="border-t border-gray-200 pt-14 min-h-[50vh] flex items-center justify-center">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
               <p className="text-gray-600">Loading your cart...</p>
            </div>
         </div>
      );
   }

   // Show empty cart message
   if (cartProduct.length === 0) {
      return (
         <div className="border-t border-gray-200 pt-14 min-h-[50vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold text-gray-700 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-500 mb-6">Add some products to get started!</p>
            <NavLink to="/collection">
               <button className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800">
                  CONTINUE SHOPPING
               </button>
            </NavLink>
         </div>
      );
   }

  return (
    <div className="border-t border-gray-200 pt-14">
   <div className=" text-2xl mb-3">
      <div className="inline-flex gap-2 items-center mb-3">
         <p className="text-gray-500">YOUR <span className="text-gray-700 font-medium">CART</span></p>
         <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
   </div>    
    {cartProduct.map((data)=><CartProductCard key={data.id} item={data}/>)}

   <div className="flex justify-end my-20">
      <div className="w-full sm:w-[450px]">
         <div className="w-full">
            <div className="text-2xl">
               <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">CART <span className="text-gray-700 font-medium">TOTALS</span></p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
               </div>
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
               <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>$ {subTotal}</p>
               </div>
               <hr/>
               <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>$ 10.00</p>
               </div>
               <hr/>
               <div className="flex justify-between"><b>Total</b><b>$ {subTotal + 10.00}</b></div>
            </div>
         </div>
         <div className=" w-full text-end">
            <NavLink to={user ? "/place-order" : ""}>
            <button className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button>
            </NavLink>
         </div>
      </div>
   </div>
</div>
  )
}

export default Cart