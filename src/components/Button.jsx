import React from "react";

const Button = ({ type = "submit", name, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
    >
      {name}
    </button>
  );
};

export default Button;
