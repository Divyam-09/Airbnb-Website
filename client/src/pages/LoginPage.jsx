/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleFormLogin(eve) {
    eve.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);

      alert("login successful");
      setRedirect(true);
    } catch (err) {
      alert("login failed");
    }
  }
  if (redirect) {
    return <Navigate to={"https://airbnb-organichousebooking-4-client.onrender.com"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto" onSubmit={handleFormLogin}>
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(eve) => setEmail(eve.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(eve) => setPassword(eve.target.value)}
          />
          <button className="primary" onClick={handleFormLogin}>
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
