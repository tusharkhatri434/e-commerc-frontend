import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/url-config";
import OrderCard from "../components/OrderCard";

const Order = () => {
  const [userOrders,setUserOrders] = useState();
  const auth = useSelector((store)=>store.auth);
  
  async function fetchData(){
    if(!auth){
      return;
    }
    const userID = auth?.user?._id;
    const data = await fetch(`${BASE_URL}/v1/api/get-orders/${userID}`);
    const json = await data.json();

    console.log(json?.data);
    let allOrdersdata = json?.data
    setUserOrders(allOrdersdata);

  }

  useEffect(()=>{
   fetchData();
  },[])
  
  if(!userOrders){
    return;
  }
  console.log(userOrders[0].orderItems);

  return (
    <div className="border-t border-gray-200 pt-16">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">MY <span className="text-gray-700 font-medium">ORDERS</span></p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      {userOrders.map((orders,index)=>(
         <div key={orders._id} className="flex flex-col border my-2 border-gray-300 p-2">
           <p className="text-lg bg-gray-500 text-white max-w-max p-2 rounded-xl mb-1">Order {index+1} : </p>
           {orders.orderItems.map((item,index)=><OrderCard key={index} data={item} />)}
           <div className="self-end">
           <button className="sm:w-full md:w-35 m-2 border px-4 py-2 text-sm font-medium rounded-sm">Total Pay : ${orders.totalAmount}</button>
           <button className="sm:w-full md:w-35 m-2 border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
         </div>
         </div>
      ))}
    </div>
  )
}

export default Order