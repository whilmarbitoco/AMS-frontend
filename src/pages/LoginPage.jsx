import { useApiUrl, useUserContext } from "../context/userContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [user, setUser] = useUserContext();
  const apiUrl = useApiUrl();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeToken = (token) => localStorage.setItem("token", token);

  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      name,
      email,
      password,
    });

    storeToken("2345tyhnbgfer3");

    navigate("/dashboard");
  };

  const submitHandler = () => {};

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
