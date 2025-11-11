import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentCancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info('Payment was cancelled');
    const timer = setTimeout(() => {
      navigate('/cart');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-red-500 text-6xl mb-4">✗</div>
      <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
      <p className="text-gray-600 mb-4">Your payment was cancelled. No charges were made.</p>
      <button
        onClick={() => navigate('/cart')}
        className="bg-black text-white px-8 py-3 text-sm"
      >
        Return to Cart
      </button>
    </div>
  );
};

export default PaymentCancel;

