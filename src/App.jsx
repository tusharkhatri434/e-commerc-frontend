import "./index.css";
import { Route,Routes } from "react-router-dom";
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
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./pages/ScrollToTop";
import PrivateRoute from "./components/PrivaterRoute";


function App() {
  return (
   
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ScrollToTop/>
      <NavBar />
      <Routes>
         <Route path="/"  element={<Home />}></Route>
         <Route path="/about"  element={<About />}></Route>
         <Route path="/Cart"  element={<Cart />}></Route>
         <Route path="/collection"  element={<Collection />}></Route>
         <Route path="/contact"  element={<Contact />}></Route>
         <Route path="/login"  element={<Login />}></Route>
         <Route path="/orders"  element={<PrivateRoute><Order /></PrivateRoute>}></Route>
         <Route path="/place-order"  element={<PrivateRoute><PlaceOrder /></PrivateRoute>}></Route>
         <Route path="/product/:productId"  element={<Product />}></Route>
         <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App