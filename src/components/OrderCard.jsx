import React from 'react'
import { IMG_URI } from '../utils/url-config';

const OrderCard = ({data}) => {
    console.log(data)
    const {image,name,price,size,quantity,_id} = data;
    
  return (
    <div>
    <div className="py-4 border-t border-gray-200 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-start gap-6 text-sm">
        <img className="w-16 sm:w-20" src={IMG_URI+image} alt="" />
        <div>
          <p className="sm:text-base font-medium">{name}</p>
          <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
            <p>${price}</p>
            <p>Quantity: {quantity}</p>
            <p>Size: {size}</p>
          </div>
          {/* <p className="mt-1">Date: <span className=" text-gray-400">Wed Apr 09 2025</span></p> */}
          <p className="mt-1">Payment: <span className=" text-gray-400">COD</span></p>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-between">
        <div className="flex items-center gap-2">
          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
          <p className="text-sm md:text-base">Order Placed</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderCard