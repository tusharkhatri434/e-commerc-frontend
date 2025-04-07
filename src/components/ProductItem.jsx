import React from 'react'
import { NavLink } from 'react-router-dom';
import { IMG_URI } from '../utils/url-config';

const ProductItem = ({data}) => {
 
  if(!data){
    return ;
  }
   const {_id,name,price,image} = data;

  return (
    <NavLink to={`/product/${_id}`} className="text-gray-700 cursor-pointer">
        <div className=" overflow-hidden">
            <img className="hover:scale-110 transition ease-in-out" src={IMG_URI + image[0]} alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">{name}</p>
            <p className=" text-sm font-medium">${price}</p>
     </NavLink>
  )
}

export default ProductItem