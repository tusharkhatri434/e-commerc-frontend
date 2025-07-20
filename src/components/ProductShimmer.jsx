// components/ProductShimmer.jsx
import React from "react";

const ProductShimmer = () => {
  return (
    <div className="animate-pulse border-t pt-10">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col no-scrollbar overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full gap-2">
            {Array(4).fill("").map((_, i) => (
              <div
                key={i}
                className="bg-gray-200 rounded w-[24%] sm:w-full sm:h-24 h-20"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] bg-gray-200 rounded h-[300px] sm:h-[500px]" />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-2/3 mt-2" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
          <div className="h-8 bg-gray-200 rounded w-1/4 mt-6" />
          <div className="h-20 bg-gray-200 rounded w-full mt-6" />

          <div className="flex flex-col gap-4 my-8">
            <div className="h-5 bg-gray-200 w-24 rounded" />
            <div className="flex gap-2 flex-wrap">
              {["S", "M", "L"].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded py-2 px-4 w-14 h-10"
                />
              ))}
            </div>
          </div>

          <div className="bg-gray-300 h-10 w-40 rounded" />

          <div className="mt-8 text-sm text-gray-400 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex">
          <div className="border px-5 py-3 text-sm bg-gray-200 w-32 h-8 rounded" />
          <div className="border px-5 py-3 text-sm bg-gray-100 w-32 h-8 rounded ml-2" />
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 mt-2">
          <div className="h-4 bg-gray-200 w-full rounded" />
          <div className="h-4 bg-gray-200 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductShimmer;
