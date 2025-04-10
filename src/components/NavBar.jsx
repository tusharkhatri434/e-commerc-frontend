import { Link, NavLink, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../context/slice/authSlice";

const NavBar = () => {
  
  const [visible,setVisible] = useState(false);
  const cartProductItem = useSelector((state)=>state.cart);
  const {user} = useSelector((store)=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    dispatch(logout());
    navigate('/');
  }

  useEffect(()=>{
   setVisible(false);
  },[navigate])
  
  return (
    <div className="flex item-center justify-between py-5 font-medium bg-white">

    <NavLink to='/'> <img src={assets.logo} alt="logo-img" className="w-36"></img></NavLink>
     <ul className="hidden sm:flex my-auto gap-5 text-sm text-gray-700">

      <NavLink to="/" className="flex flex-col items-center gap-1">
           <p>HOME</p>
           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
      </NavLink>

      <NavLink to="/collection" className="flex flex-col items-center gap-1">
           <p>COLLECTION</p>
           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
      </NavLink>
      <NavLink to="/about" className="flex flex-col items-center gap-1">
           <p>ABOUT</p>
           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
      </NavLink>
      <NavLink to="/contact" className="flex flex-col items-center gap-1">
           <p>CONTACT</p>
           <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
      </NavLink>

     </ul>

     <div className="flex items-center gap-6">
      <img src={assets.search_icon} alt="" className="w-5 cursor-pointer" />
        
        <div className="group relative">
          <NavLink to={user ? "":"/login"}><img className="w-5 cursor-pointer" src={assets.profile_icon} /></NavLink>
          {user ? <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 px-5 bg-slate-100 text-gray-700">
              <p className="cursor-pointer hover:text-black">My profile</p>
              <NavLink to="/orders"><p className="cursor-pointer hover:text-black">Orders</p></NavLink>
              <p onClick={logoutHandler} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div> : null}
         
        </div>

      <Link to="/cart" className="relative">
       <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
       <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">{cartProductItem?.length}</p>
      </Link>
      <img onClick={()=>setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" />
      </div>
      {/* sidebar menu for small screens*/}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full':' w-0'}`}>
            <div className="flex flex-col text-gray-600">
                <div onClick={()=>setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                  <img  className="h-4 rotate-180" src={assets.dropdown_icon} />
                  <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(true)} className="py-2 pl-6 border" to="/">HOME</NavLink>
                <NavLink onClick={()=>setVisible(true)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(true)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(true)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
            </div>
      </div>
    </div>
  )
}

export default NavBar