import { createContext, useState } from "react";
import { products } from "../assets/assets";
export const ProductStore = createContext(null);

const StoreContext = ({children}) => {
  
  const [cartItem,setCartItem] = useState([]);

  return (
    <ProductStore.Provider value={{products}}>
      {children}
    </ProductStore.Provider>
  )
}

export default StoreContext