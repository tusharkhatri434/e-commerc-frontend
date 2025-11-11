import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/url-config";
import OrderCard from "../components/OrderCard";

const Order = () => {
  const [userOrders, setUserOrders] = useState(null);
  const auth = useSelector((store) => store.auth);

  async function fetchData() {
    if (!auth || !auth.token) return;

    const userID = auth?.user?._id;
    try {
      const response = await fetch(`${BASE_URL}/v1/api/get-orders/${userID}`, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      const json = await response.json();
      
      if (json.success) {
        setUserOrders(json?.data || []);
      } else {
        console.error("Failed to fetch orders:", json.msg);
        setUserOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setUserOrders([]);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!userOrders) {
    return (
      <div className="p-10 text-center text-gray-600">Loading your orders...</div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-16">
      <div className="text-2xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            MY <span className="text-gray-700 font-medium">ORDERS</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      {userOrders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {userOrders.map((orders, index) => (
        <div
          key={orders._id}
          className="flex flex-col border my-4 border-gray-300 p-4 rounded-md shadow-sm"
        >
          <p className="text-lg bg-gray-500 text-white max-w-max p-2 rounded-xl mb-1">
            Order {index + 1} :
          </p>

          <div className="flex flex-col">
            {orders.orderItems.map((item, i) => (
              <OrderCard key={i} data={item} />
            ))}
          </div>

          <div className="self-end mt-4 flex gap-2">
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">
              Total Pay: ₹{orders.totalAmount}
            </button>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm bg-blue-500 text-white hover:bg-blue-600">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
