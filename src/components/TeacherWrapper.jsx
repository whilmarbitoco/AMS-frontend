import React from "react";
import NavBar from "./NavBar";

const TeacherWrapper = ({ page, children }) => {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <h1 className="text-center text-4xl font-bold mb-8 tracking-wide">
          AMS
        </h1>
        <NavBar />
      </nav>
      <main className="w-full bg-gray-200">
        <div className="w-full p-5 bg-white">
          <h1 className="text-gray-700 text-2xl font-bold">{page}</h1>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default TeacherWrapper;
