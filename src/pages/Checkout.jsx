import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { BASE_URL } from '../utils/url-config';
import { toast } from 'react-toastify';
import { selectCartItems, clearCart } from '../context/slice/cartSlice';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProduct = useSelector(selectCartItems);
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('stripe');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cartProduct.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
    }
  }, [user, cartProduct, navigate]);

  const calculateTotal = () => {
    const subtotal = cartProduct.reduce((sum, item) => sum + item.price * item.count, 0);
    return subtotal + 10; // Add shipping
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStripeCheckout = async () => {
    try {
      setLoading(true);

      const orderData = {
        userId: user._id,
        orderItems: cartProduct,
        address: formData,
      };

      const response = await fetch(`${BASE_URL}/v1/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error(data.msg || 'Failed to create checkout session');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate checkout');
      setLoading(false);
    }
  };

  const handleCODOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
        user,
        orderItems: cartProduct,
        address: formData,
      };

      const response = await fetch(`${BASE_URL}/v1/api/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Order placed successfully!');
        
        // Clear cart in DB and Redux after successful order
        try {
          await dispatch(clearCart({ 
            userId: user._id, 
            token 
          })).unwrap();
        } catch (clearError) {
          console.error('Failed to clear cart:', clearError);
        }
        
        navigate('/orders');
      } else {
        toast.error(data.msg || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.zipCode || !formData.country || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'stripe') {
      await handleStripeCheckout();
    } else if (paymentMethod === 'cod') {
      await handleCODOrder();
    }
  };

  return (
    <div className="border-t border-gray-200 pt-14">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-between gap-4 min-h-[80vh]">
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                DELIVERY <span className="text-gray-700 font-medium">INFORMATION</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              required
              name="firstName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="First name"
              value={formData.firstName}
            />
            <input
              onChange={handleChange}
              required
              name="lastName"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
            />
          </div>
          
          <input
            onChange={handleChange}
            required
            name="email"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="email"
            placeholder="Email address"
            value={formData.email}
          />
          
          <input
            onChange={handleChange}
            required
            name="street"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Street"
            value={formData.street}
          />
          
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              required
              name="city"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="City"
              value={formData.city}
            />
            <input
              onChange={handleChange}
              name="state"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="State"
              value={formData.state}
            />
          </div>
          
          <div className="flex gap-3">
            <input
              onChange={handleChange}
              required
              name="zipCode"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Zipcode"
              value={formData.zipCode}
            />
            <input
              onChange={handleChange}
              required
              name="country"
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
              type="text"
              placeholder="Country"
              value={formData.country}
            />
          </div>
          
          <input
            onChange={handleChange}
            required
            name="phone"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
          />
        </div>

        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <div className="w-full">
              <div className="text-2xl">
                <div className="inline-flex gap-2 items-center mb-3">
                  <p className="text-gray-500">
                    CART <span className="text-gray-700 font-medium">TOTALS</span>
                  </p>
                  <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>$ {(calculateTotal() - 10).toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>$ 10.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>$ {calculateTotal().toFixed(2)}</b>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                PAYMENT <span className="text-gray-700 font-medium">METHOD</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
            
            <div className="flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setPaymentMethod('stripe')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  paymentMethod === 'stripe' ? 'border-green-500' : ''
                }`}
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img
                  className="h-5 mx-4"
                  src="data:image/png;base64,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"
                  alt="Stripe"
                />
              </div>
              
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
                  paymentMethod === 'cod' ? 'border-green-500' : ''
                }`}
              >
                <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>
            
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-16 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'PLACE ORDER'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

