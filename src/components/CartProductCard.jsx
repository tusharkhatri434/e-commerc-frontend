import React, { useState, useCallback } from 'react'
import { IMG_URI } from '../utils/url-config';
import { useDispatch, useSelector } from 'react-redux';
import { 
   updateProductCountOptimistic, 
   removeProductOptimistic,
   updateCartItem,
   removeFromCart 
} from '../context/slice/cartSlice';
import { debounce } from '../utils/debounce';

const CartProductCard = ({item}) => {

   const [count, setCount] = useState(item.count);
   const [isRemoving, setIsRemoving] = useState(false);
   const dispatch = useDispatch();
   const { user, token } = useSelector((state) => state.auth);

   // Debounced API call for quantity update
   const debouncedUpdateAPI = useCallback(
      debounce(async (itemId, newCount) => {
         if (user && token) {
            try {
               await dispatch(updateCartItem({ 
                  userId: user._id, 
                  token, 
                  itemId, 
                  quantity: newCount 
               })).unwrap();
            } catch (error) {
               console.error('Failed to update cart:', error);
            }
         }
      }, 800),
      [dispatch, user, token]
   );

   const countChangeHandler = (e) => {
      const newCount = parseInt(e.target.value);
      
      // Minimum quantity is 1
      if (newCount < 1 || isNaN(newCount)) {
         setCount(1);
         dispatch(updateProductCountOptimistic({ id: item.id || item.itemId, count: 1 }));
         debouncedUpdateAPI(item.itemId || item.id, 1);
         return;
      }

      setCount(newCount);
      
      // Optimistic update for instant UI feedback
      dispatch(updateProductCountOptimistic({ id: item.id || item.itemId, count: newCount }));
      
      // Debounced API call to avoid too many requests
      debouncedUpdateAPI(item.itemId || item.id, newCount);
   }

   const removeHandler = async () => {
      if (!user || !token) {
         return;
      }

      setIsRemoving(true);

      try {
         // Optimistic update for instant UI feedback
         dispatch(removeProductOptimistic({ id: item.id || item.itemId }));
         
         // Sync with backend
         await dispatch(removeFromCart({ 
            userId: user._id, 
            token, 
            itemId: item.itemId || item.id 
         })).unwrap();
      } catch (error) {
         console.error('Failed to remove item:', error);
      } finally {
         setIsRemoving(false);
      }
   }

  return (
  <div>
    <div className="py-4 border-t border-gray-200 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
       <div className=" flex items-start gap-6">
          <img className="w-16 sm:w-20" src={IMG_URI+item.image?.[0]} alt=""/>
          <div>
             <p className="text-xs sm:text-lg font-medium">{item.name}</p>
             <div className="flex items-center gap-5 mt-2">
                <p>${item.price}</p>
                <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
             </div>
          </div>
       </div>
       <input 
          onChange={countChangeHandler} 
          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" 
          type="number" 
          min="1" 
          value={count}
       />
       <button
          onClick={removeHandler}
          disabled={isRemoving}
          className="w-4 mr-4 sm:w-5 cursor-pointer disabled:opacity-50"
          title="Remove item"
       >
          <img 
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgB7ZfhTcMwFITPEf/JCBkBNggTUCYAJqAj0A1ggzABZYHEbJANmm4QFgicwUJVlTq8F6Wkkj/p5DaX1Ff7pc0zEJLn+ROHB8ElDXVjra0F1yCBHEkoR0ZdQ8gZ9DSUDfgZlUPJqGDcnvtDJrc8x4hgmq08CoZfbAFZDdz5saXWgfNSauFf115/wX3uygX7xPxYuq0sMC/cir2Z/aM7K8jatleYCH9zVP7tI+da7fqzLf4YTMpsg6l++Vm3GX7+M99ZtOuAX9N/gQLtirlJl9QrQ6QBvzjgTxbsd7IkSc4V/iCx+KXEYFJiMCkxmJQYTEoMJkUbrPFjW5blNuCj67oPKNB24s/U1hiz6TNdY8HHnW+/qqoWClTBOLGbrBg4J+gPEYtfykk2I6lvKqYi2AuEgl1QG/wTfVupur1H0uwf6FuxS+oWx6Pt6z2/APN7VZph5zBWAAAAAElFTkSuQmCC" 
             alt="Remove" 
          />
       </button>
    </div>
 </div>
 )
}

export default CartProductCard