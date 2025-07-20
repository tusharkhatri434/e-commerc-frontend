import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL, IMG_URI } from '../utils/url-config';
import { useDispatch } from 'react-redux';
import { addProducts } from "../context/slice/cartSlice";
import { toast } from 'react-toastify';
import ProductShimmer from '../components/ProductShimmer';

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();

  const notify = () =>
    toast.error("Select Product Size", {
      theme: "light",
      autoClose: 1500,
    });

  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/v1/api/product/${id}`);
      const result = await res.json();
      if (result.success) {
        setProduct(result.data.product);
        setRelated(result.data.relatedProducts);
      } else {
        toast.error("Failed to fetch product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching product");
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const addToCartHandler = () => {
    if (!size) {
      notify();
      return;
    }
    dispatch(addProducts({ ...product, id: Date.now() * 2, count: 1, size }));
  };

  if (!product) {
    return <ProductShimmer/>;
  }

  const { image = [], name, price, sizes = [], description } = product;

  return (
    <div className="border-t border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Image Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col no-scrollbar overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {image.map((uri, index) => (
              <img
                key={index}
                src={IMG_URI + uri}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={IMG_URI + image[0]}
              alt="product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <p className="pl-2 text-black">⭐⭐⭐⭐ (122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">${price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border-[1.5px] py-2 px-4 bg-gray-100 ${
                    size === item ? 'border-red-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addToCartHandler}
            className="bg-black cursor-pointer text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{description}</p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors).
          </p>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="my-24">
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {related.map((item) => (
              <Link to={`/product/${item._id}`}>
              <div
                key={item._id}
                className="border-[1px] border-gray-300 p-1 rounded"
              >
                <img
                  src={IMG_URI + item.image[0]}
                  alt={item.name}
                  className="w-full h-[180px] object-cover"
                />
                <p className="font-medium mt-2">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-black font-semibold">${item.price}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
