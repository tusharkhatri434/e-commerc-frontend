import React from 'react';
import { IMG_URI } from '../utils/url-config';

const OrderCard = ({ data }) => {
  const {
    image,
    name,
    price,
    size,
    quantity,
    _id,
    date,
    paymentMethod = "COD", // fallback
    status = "Order Placed", // fallback
  } = data;

  // Format date - converts ISO string to readable format
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : "Unknown Date";

  // Status color mapping
  const statusColor = {
    "Order Placed": "bg-green-500",
    "Shipped": "bg-yellow-500",
    "Out for Delivery": "bg-blue-500",
    "Delivered": "bg-purple-500",
    "Cancelled": "bg-red-500",
  };

  return (
    <div className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Product Info */}
      <div className="flex items-start gap-6 text-sm">
        <img
          className="w-16 sm:w-20 object-cover"
          src={IMG_URI + image}
          alt={name}
        />
        <div>
          <p className="sm:text-base font-medium">{name}</p>
          <div className="flex flex-wrap gap-4 mt-1 text-base text-gray-700">
            <p>${price}</p>
            <p>Qty: {quantity}</p>
            <p>Size: {size}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Date: <span className="text-gray-400">{formattedDate}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Payment: <span className="text-gray-400">{paymentMethod}</span>
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="md:w-1/2 flex justify-between md:justify-end mt-2 md:mt-0">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${
              statusColor[status] || "bg-gray-400"
            }`}
          ></span>
          <p className="text-sm md:text-base">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
