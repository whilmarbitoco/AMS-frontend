import React from "react";

const Input = ({ type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 
      rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:border-transparent transition duration-200 ease-in-out
      placeholder-gray-400 hover:border-gray-400"
    />
  );
};

export default Input;
