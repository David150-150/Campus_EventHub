import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  async function registerUser(ev) {
    ev.preventDefault();

    if (password !== confirmPassword) {
      setNotification({ message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      await axios.post("/register", {
        name,
        email,
        password,
        role: "user", // Default role
      });
      setNotification({ message: "Registration Successful!", type: "success" });
      setRedirect(true);
    } catch (e) {
      if (e.response && e.response.data.error === "Duplicate entry") {
        setNotification({
          message: "This email is already registered. Please log in instead.",
          type: "error",
        });
      } else {
        setNotification({
          message: "Registration failed. Please try again later.",
          type: "error",
        });
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/signform.png')",
      }}
    >
      {/* Registration Form Container */}
      <div className="bg-white bg-opacity-90 w-full sm:w-full md:w-1/2 lg:w-1/3 px-7 py-7 rounded-xl shadow-lg">
        <Notification message={notification.message} type={notification.type} />
        <form className="flex flex-col w-auto items-center" onSubmit={registerUser}>
          <h1 className="px-3 font-extrabold mb-5 text-primarydark text-2xl">Sign Up</h1>
          <div className="input w-full mb-3">
            <input
              type="text"
              placeholder="Name"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
          </div>
          <div className="input w-full mb-3">
            <input
              type="email"
              placeholder="Email"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="input w-full mb-3">
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div className="input w-full mb-3">
            <input
              type="password"
              placeholder="Confirm password"
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
            />
          </div>
          <div className="w-full py-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded w-full transition duration-300"
            >
              Create Account
            </button>
          </div>
          <div className="flex justify-between gap-4 w-full">
            <Link to={"/login"} className="w-1/2">
              <button className="text-black border border-gray-300 rounded py-2 w-full hover:bg-gray-100">
                Sign In
              </button>
            </Link>
            <Link to={"/register"} className="w-1/2">
              <button className="text-white bg-blue-600 rounded py-2 w-full hover:bg-blue-700">
                Sign Up
              </button>
            </Link>
          </div>
          <Link to={"/"} className="mt-4">
            <button className="text-gray-600 hover:underline">
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
