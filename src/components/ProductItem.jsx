import React from 'react'
import { NavLink } from 'react-router-dom';

const ProductItem = ({id}) => {
  return (
    <NavLink to={`/product/${id}`} class="text-gray-700 cursor-pointer" href="/product/6683da887f779795ecfa98fd">
        <div className=" overflow-hidden">
            <img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png" alt="" />
            </div>
            <p className="pt-3 pb-1 text-sm">Kid Tapered Slim Fit Trouser</p>
            <p className=" text-sm font-medium">$38</p>
     </NavLink>
  )
}

export default ProductItem