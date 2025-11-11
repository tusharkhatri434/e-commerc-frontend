import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/url-config';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const orderId = searchParams.get('order_id');

      if (!sessionId || !orderId) {
        toast.error('Invalid payment session');
        navigate('/cart');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/v1/api/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId, orderId }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Payment successful! Your order has been placed.');
          setTimeout(() => {
            navigate('/orders');
          }, 2000);
        } else {
          toast.error('Payment verification failed');
          navigate('/cart');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify payment');
        navigate('/cart');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, navigate, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {verifying ? (
        <>
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment</p>
        </>
      ) : (
        <>
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Redirecting to your orders...</p>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;

