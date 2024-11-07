import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gray-200 h-screen text-gray-800 p-5 px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">AMS</h1>
        <Link
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
