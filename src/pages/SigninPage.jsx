import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Input from "../components/Input";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import axios from "axios";

const SigninPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useAuth();

  const [api, setApi] = useAtom(apiStore);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (!email || email.length < 3) {
      return false;
    }
    if (!password || password.length < 3) {
      return false;
    }

    if (!username || username.length < 3) {
      return false;
    }

    return true;
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = {
      email,
      username,
      password,
    };

    const res = await fetch(`${api}/user/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      alert("User Created");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleSignin} className="flex flex-col gap-2 my-5">
          <Input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;
