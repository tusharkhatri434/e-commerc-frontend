import React from "react";
import { Link } from "react-router-dom";
import not_found_img from '../assets/not_found_img.webp';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img
          src={not_found_img}
          alt="404 Not Found"
          className="w-80 mx-auto"
        />
        <h1 className="text-5xl font-bold text-gray-800 mt-6">Oops!</h1>
        <p className="text-lg text-gray-600 mt-2">
          We can't find the page you're looking for.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
