import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import PlaceOrder from './pages/PlaceOrder';
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./pages/ScrollToTop";
import PrivateRoute from "./components/PrivaterRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
      
      <Routes>
        {/* Admin Routes (No NavBar/Footer) */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/orders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
        <Route path="/admin/products" element={<PrivateRoute><AdminProducts /></PrivateRoute>} />
        
        {/* Regular Routes (With NavBar/Footer) */}
        <Route path="/*" element={
          <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<PrivateRoute><Order /></PrivateRoute>} />
              <Route path="/place-order" element={<PrivateRoute><PlaceOrder /></PrivateRoute>} />
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/payment-success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        } />
      </Routes>
    </>
  )
}

export default App