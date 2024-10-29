import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Input from "../components/Input";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import axios from "axios";
import Button from "../components/Button";

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
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h1>
        <form onSubmit={handleSignin} className="flex flex-col gap-2 my-5">
          <Input type="text" label="Username" onChange={setUsername} />
          <Input type="email" label="Email" onChange={setEmail} />
          <Input type="password" label="Password" onChange={setPassword} />
          <Button name="Sign In" onClick={null} />
        </form>
        <li className="list-none text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </Link>
        </li>
      </div>
    </div>
  );
};

export default SigninPage;
