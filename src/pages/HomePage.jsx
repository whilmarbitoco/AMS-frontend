import { Link } from "react-router-dom";
import bg from "../assets/images/mnhsbg.jpg";
import gif from "../assets/images/mnhsgif.gif";

const HomePage = () => {
  return (
    <div
      className="relative h-screen p-5 px-8 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-40"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between py-2 px-4">
          <h1 className="text-3xl text-white font-extrabold tracking-wide">
            AMS
          </h1>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 font-semibold rounded-lg shadow-md transition duration-300"
          >
            Login
          </Link>
        </div>
        <div className="flex items-center justify-center flex-col p-5">
          <img
            src={gif}
            alt="Magnaga National High School Logo"
            className="mb-4"
          />
          <h1 className="text-5xl font-bold text-white">
            Magnaga National High School
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
