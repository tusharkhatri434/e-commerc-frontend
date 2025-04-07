import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [isLoginForm,setLoginForm] = useState(true);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPasssword] = useState("");
  
  const navigate = useNavigate();

  const formTypeChangeHandler = ()=>{
    setEmail('');
    setPasssword('');
    setName('');
    setLoginForm(!isLoginForm);
     }

  const formSubmitHandler = (e)=>{
    e.preventDefault();
    if(isLoginForm){
      if(email && password){
        console.log(email,password);
        navigate("/");
      }
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
    <div className="inline-flex items-center gap-2 mb-2 mt-10">
       <p className="prata-regular text-3xl">{isLoginForm ? "Login" : "Sign Up"}</p>
       <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
    </div>
    { (!isLoginForm) ? 
    <input onChange={(e)=>setName(e.target.value)} type="text" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required={true}  value={name} /> : null }
    <input onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required={true}  value={email}/>
    <input onChange={(e)=>setPasssword(e.target.value)} type="password" className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required={true} value={password} />
    <div className="w-full flex justify-between text-sm mt-[-8px]">
       <p className="cursor-pointer">Forgot your password?</p>
       <p onClick={formTypeChangeHandler} className="cursor-pointer">{isLoginForm?"Create account":"Login Here"}</p>
    </div>
    <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">{isLoginForm ? "Sign In" : "Sign Up"}</button>
 </form>
  )
}

export default Login