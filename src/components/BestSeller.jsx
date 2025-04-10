import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';


const BestSeller = () => {

  const [bestSellerProducts,setBestSellerProducts] = useState(null);

  const fetchDataHandler = async ()=>{
     const data = await fetch("http://localhost:8090/v1/api/products/bestseller");
     const res = await data.json();
     if(res.success){
       setBestSellerProducts(res.data);
     }
     console.log(res);
  }

  useEffect(()=>{
    fetchDataHandler();
  },[]);
 
  if(!bestSellerProducts){
    return ;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {bestSellerProducts.map((value,i)=>{
        return (<ProductItem key={i} data={value}/>)})}
       </div>
  )
}

export default BestSeller