import React, { useState } from "react";
import NavBar from "./NavBar";
import { userStore } from "../store/userStore";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import { Toaster } from "sonner";

const TeacherWrapper = ({ page, children }) => {
  const [user, setUser] = useAtom(userStore);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const logout = () => {
    setUser({});
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[100vh]">
      <Toaster position="top-right" richColors />

      {/* Mobile Nav Toggle Button */}
      <button
        className="lg:hidden p-4 bg-blue-600 text-white flex justify-between items-center"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <span className="text-2xl font-bold">AMS</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <nav
        className={`lg:w-64 bg-blue-600  text-white shadow-lg lg:block ${
          isNavOpen ? "block" : "hidden"
        }`}
      >
        <h1 className="hidden text-center text-4xl font-bold mb-8 mt-8 tracking-wide lg:block">
          AMS
        </h1>

        <NavBar />
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-gray-200">
        <div className="w-full p-5 bg-white flex justify-between items-center">
          <h1 className="text-gray-700 text-2xl font-bold">{page}</h1>
          <div className="relative">
            <button
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="text-sm lg:text-2">Hello, {user.username}</span>
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
                  to="/dashboard/profile"
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

export default TeacherWrapper;
