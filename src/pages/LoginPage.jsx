import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import Input from "../components/Input";
import { useAtom } from "jotai";
import { apiStore } from "../store/apiStore";
import { userStore } from "../store/userStore";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useAuth();
  const [api, setApi] = useAtom(apiStore);
  const [user, setUser] = useAtom(userStore);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (!email || email.length < 3) {
      return false;
    }
    if (!password || password.length < 6) {
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const data = {
        email,
        password,
      };

      const res = await fetch(`${api}/user/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        alert("Login Failed");
      }

      const resData = await res.json();
      console.log(resData.user);

      setUser(resData.user);
      setToken(resData.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-96 p-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 my-5">
          <Input type="email" label="Email" onChange={setEmail} />
          <Input type="password" label="Password" onChange={setPassword} />
          <Button name="Login" onClick={null} />
        </form>
        <li className="list-none text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign In
          </Link>
        </li>
      </div>
    </div>
  );
};

export default LoginPage;
