import { useContext } from 'react';
import ProductItem from './ProductItem';
import { ProductStore } from '../context/StoreContext';

const BestSeller = () => {

  const {products} = useContext(ProductStore);
const bestSellerProducts = products.slice(10,15);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {bestSellerProducts.map((value,i)=>{
        return (<ProductItem key={i} data={value}/>)})}
       </div>
  )
}

export default BestSeller