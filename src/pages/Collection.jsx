import Title from "../components/Title"
import { products } from '../assets/assets'
import ProductItem from '../components/ProductItem';
import { useState } from "react";

const Collection = () => {

  const [isFilterOpen,setFilterOpen] = useState(false);

  if(!products){
    return;
  }

  console.log(products);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t-1 border-gray-300">
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img onClick={()=>setFilterOpen(!isFilterOpen)} className="h-3 sm:hidden" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAkCAYAAACJ8xqgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEJwAABCcASbNOjQAAAGASURBVEhLrZa7cYQwFEX5RiRbwpawLoEEhtAVeN2BOzCuxHYFJMzwSWjBJVCCIzLA74KQWRAgBGcG0GOGw9WHERrIsizM8/y9Kw6iJ0lyN03zk9Wh53kfrK2EQbywNgjxAtZWwqiq6pmuP32paUh7RKrjFEXRxXGcgpo31KCu69cgCL5YKU0nBGdJuRBQV6/UZUiv/Z390gchEEnbtn3yfZ+P8xoGu3IoTUmpXGqW/Z1OWNBa5UOxxizhwDRp0zS/uq67W0kXhUBFuioEe6WbQiCSYqIw3qjHzCZFxHSi6HO90FHgRajHSCUcmCallCWldcdJdwnBlnS3EKxJlYQgjuObZVkFxhP1IJWaFBG2bWu0fFj1j5IQXSZZRMdDOqUunzoppy4bGRmQEk5lJFr8njeFe2RgVbhXBhaFKjIgFKrKwEw4lQGaUbVNCnuzQHaXlQEuHG30U9k3K6Xouiz6a1CRAf1MGTDOlAGDlgR/mDaityMyDi2VME3TE36JNe0PEvQ33QXCa5oAAAAASUVORK5CYII=" alt="" />
        </p>
        <div className="border border-gray-300 pl-5 py-3 mt-6 hidden sm:block">
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Men" /> Men</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Women" /> Women</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Kids" /> kids</p>
          </div>
        </div>
        <div className="border border-gray-300 pl-5 py-3 my-5 hidden sm:block">
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Topwear" /> Topwear</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Bottomwear" /> Bottomwear</p>
            <p className="flex gap-2"><input className="w-3" type="checkbox" value="Winterwear" /> Winterwear</p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">ALL <span className="text-gray-700 font-medium">COLLECTIONS</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {products.map((item)=><ProductItem key={item.id} data={item} />)}
        </div>
      </div>

    </div>
  )
}

export default Collection