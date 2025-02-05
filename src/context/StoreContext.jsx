import { createContext } from "react";
import { products } from "../assets/assets";
export const ProductStore = createContext(null);

const StoreContext = ({children}) => {

  return (
    <ProductStore.Provider value={{products}}>
      {children}
    </ProductStore.Provider>
  )
}

export default StoreContext