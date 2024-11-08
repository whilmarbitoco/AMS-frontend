import { useNavigate } from "react-router-dom";

const NotAllowed = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotAllowed;
