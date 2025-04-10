import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts,productCountIncrement,removeProducts } from "../context/slice/cartSlice";
import { IMG_URI } from "../utils/url-config";
import CartProductCard from "../components/CartProductCard";
import { NavLink } from "react-router-dom";

const Cart = () => {
      
   const cartProduct = useSelector((state)=>state.cart);
   console.log("CART",cartProduct);
   const {user} = useSelector((store)=>store.auth);

   const subTotal = useMemo(()=>{
      let sum = 0;
      if(cartProduct.length>0){
      cartProduct.forEach((element) => {
     sum = sum+element.price * element.count;
      });
      return sum;
   }
      return sum;
   },[cartProduct]);

   if(cartProduct.length==0) return <h1>Cart Empty</h1>;

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