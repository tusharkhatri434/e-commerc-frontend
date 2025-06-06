import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { products } from '../assets/assets'
import { BASE_URL, IMG_URI } from '../utils/url-config';
import { useDispatch } from 'react-redux';
import {addProducts} from "../context/slice/cartSlice";
import { toast} from 'react-toastify';
import ProductItem from '../components/ProductItem';

const Product = () => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const [size,setSize] = useState(null);
  const dispatch = useDispatch();

  const notify = () => toast.error("Select Product Size",{
    theme: "light",
    autoClose: 1500,

  });

  const fetchProduct = async (id) => {

    const data = await fetch(`${BASE_URL}/v1/api/product/${id}`);
    const res = await data.json();
    console.log(res.data);
     if(res.success){
       setData(res.data);
     }
  }

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);
  // console.log(productId);

  const addToCartHandler = ()=>{
    if(!size){
      notify();
      return;
    }
    dispatch(addProducts({...data,id:Date.now()*2,count:1,size}));
  }

  if (!data) {
    return <h1>Loading.......</h1>;
  }

  const { _id,image, name, price, sizes, description } = data;


  return (
    <div className="border-t-1 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col no-scrollbar overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {image.map((uri, index) => (
              <img
                key={index}
                src={IMG_URI+uri}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" alt="" />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={IMG_URI + image[0]} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{name}</h1>
          <div className=" flex items-center gap-1 mt-2">
            <p className="pl-2 text-black">⭐⭐⭐⭐ (122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizes.map((item,index)=>(
              <button onClick={()=>setSize(item)} key={index} className={`border-[1.5px] py-2 px-4 bg-gray-100 ${size==item ? 'border-red-500':""}`}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={addToCartHandler} className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>
      </div>
      <div className="my-24">
        {/* <div className=" text-center text-3xl py-2">
          <div className="inline-flex gap-2 items-center mb-3">
            <p className="text-gray-500">RELATED <span className="text-gray-700 font-medium">PRODUCTS</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {/* {data?.relatedProducts.map((item)=><ProductItem data={item} key={item._id} />)} */}
          {/* <a className="text-gray-700 cursor-pointer" href="/product/6683d5b67f779795ecfa98bb">
            <div className=" overflow-hidden"><img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png" alt="" /></div>
            <p className="pt-3 pb-1 text-sm">Boy Round Neck Pure Cotton T-shirt</p>
            <p className=" text-sm font-medium">$60</p>
          </a>
          <a className="text-gray-700 cursor-pointer" href="/product/6683d4b27f779795ecfa98ab">
            <div className=" overflow-hidden"><img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img6.png" alt="" /></div>
            <p className="pt-3 pb-1 text-sm">Girls Round Neck Cotton Top</p>
            <p className=" text-sm font-medium">$56</p>
          </a>
          <a className="text-gray-700 cursor-pointer" href="/product/6683d7567f779795ecfa98cf">
            <div className=" overflow-hidden"><img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img24.png" alt="" /></div>
            <p className="pt-3 pb-1 text-sm">Boy Round Neck Pure Cotton T-shirt</p>
            <p className=" text-sm font-medium">$30</p>
          </a>
          <a className="text-gray-700 cursor-pointer" href="/product/6683d7b57f779795ecfa98d5">
            <div className=" overflow-hidden"><img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img3.png" alt="" /></div>
            <p className="pt-3 pb-1 text-sm">Girls Round Neck Cotton Top</p>
            <p className=" text-sm font-medium">$38</p>
          </a>
          <a className="text-gray-700 cursor-pointer" href="/product/6683d6547f779795ecfa98c3">
            <div className=" overflow-hidden"><img className="hover:scale-110 transition ease-in-out" src="https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img18.png" alt="" /></div>
            <p className="pt-3 pb-1 text-sm">Boy Round Neck Pure Cotton T-shirt</p>
            <p className=" text-sm font-medium">$28</p>
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default Product
