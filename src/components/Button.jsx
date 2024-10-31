const Button = ({ type = "primary", name, onClick }) => {
  const getButtonColor = () => {
    switch (type) {
      case "primary":
        return "bg-blue-600 hover:bg-blue-700";
      case "second":
        return "bg-gray-600 hover:bg-gray-700";
      case "delete":
        return "bg-red-600 hover:bg-red-700";
      case "success":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  return (
    <button
      onClick={onClick}
      type="submit"
      className={`mt-3 px-4 py-2 ${getButtonColor()} text-white rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg w-full`}
    >
      {name}
    </button>
  );
};

export default Button;
