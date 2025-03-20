

const Cart = () => {
  return (
    <div className="border-t pt-14">
   <div className=" text-2xl mb-3">
      <div className="inline-flex gap-2 items-center mb-3">
         <p className="text-gray-500">YOUR <span className="text-gray-700 font-medium">CART</span></p>
         <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
      </div>
   </div>
   <div>
      <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
         <div className=" flex items-start gap-6">
            <img className="w-16 sm:w-20" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img8.png" alt=""/>
            <div>
               <p className="text-xs sm:text-lg font-medium">Men Round Neck Pure Cotton T-shirt</p>
               <div className="flex items-center gap-5 mt-2">
                  <p>$64</p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">S</p>
               </div>
            </div>
         </div>
         <input className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" type="number" min="1" value="1"/><img className="w-4 mr-4 sm:w-5 cursor-pointer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgB7ZfhTcMwFITPEf/JCBkBNggTUCYAJqAj0A1ggzABZYHEbJANmm4QFgicwUJVlTq8F6Wkkj/p5DaX1Ff7pc0zEJLn+ROHB8ElDXVjra0F1yCBHEkoR0ZdQ8gZ9DSUDfgZlUPJqGDcnvtDJrc8x4hgmq08CoZfbAFZDdz5saXWgfNSauFf115/wX3uygX7xPxYuq0sMC/cir2Z/aM7K8jatleYCH9zVP7tI+da7fqzLf4YTMpsg6l++Vm3GX7+M99ZtOuAX9N/gQLtirlJl9QrQ6QBvzjgTxbsd7IkSc4V/iCx+KXEYFJiMCkxmJQYTEoMJkUbrPFjW5blNuCj67oPKNB24s/U1hiz6TNdY8HHnW+/qqoWClTBOLGbrBg4J+gPEYtfykk2I6lvKqYi2AuEgl1QG/wTfVupur1H0uwf6FuxS+oWx6Pt6z2/APN7VZph5zBWAAAAAElFTkSuQmCC" alt=""/>
      </div>
   </div>
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
                  <p>$ 124.00</p>
               </div>
               <hr/>
               <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>$ 10.00</p>
               </div>
               <hr/>
               <div className="flex justify-between"><b>Total</b><b>$ 134.00</b></div>
            </div>
         </div>
         <div className=" w-full text-end"><button className="bg-black text-white text-sm my-8 px-8 py-3">PROCEED TO CHECKOUT</button></div>
      </div>
   </div>
</div>
  )
}

export default Cart