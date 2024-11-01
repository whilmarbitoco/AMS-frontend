import React, { useState } from "react";
import NavBar from "./admin/NavBar";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";

const AdminWrapper = ({ page, children }) => {
  const [user, setUser] = useAtom(userStore);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex min-h-[100vh]">
      <Toaster position="top-right" richColors />
      <nav className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-center text-4xl font-bold mb-8 tracking-wide">
          AMS
        </h1>
        <NavBar />
      </nav>
      <main className="w-full bg-gray-200">
        <div className="w-full p-5 bg-white flex justify-between items-center">
          <h1 className="text-gray-700 text-2xl font-bold">{page}</h1>
          <div className="relative mr-3">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-2">Hello, {user.username}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ul
              className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <Link
                  to="/admin/profile"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default AdminWrapper;
