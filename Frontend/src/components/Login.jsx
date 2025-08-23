import React, { use, useMemo, useState } from "react";
import SplitText from "../ui/SplitText";
import GooeyNav from "../ui/GooeyNav";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const items = [
  { label: "Login", href: "#" },
  { label: "Register", href: "#" },
];

function Auth() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  const splitTextElement = React.useMemo(
    () => (
      <SplitText
        text="Simple Notes"
        className="text-2xl font-semibold text-center"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
    ),
    []
  );

  const [activeTab, setActiveTab] = useState(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState(""); // only for register
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    return (
      <div className="min-h-screen text-white z-10">
        <div className="flex items-center justify-between h-16">
          <Link to={"/"}>
            <div className="flex items-center space-x-4">
              {splitTextElement}
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 z-10">
          <h2 className="text-2xl font-bold mb-4 z-10">
            You are already logged in!
          </h2>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 z-10"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/auth");
              }}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 z-10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const API_URL = "https://simple-notes-km3c.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pass: password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.id);
        navigate("/"); // redirect
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pass: password, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! You can login now.");
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white z-10">
      {/* Navbar */}
      <nav className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to={"/"}>
              <div className="flex items-center space-x-4">
                {splitTextElement}
              </div>
            </Link>

            <div className="relative">
              <GooeyNav
                items={items}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={activeTab}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onChange={(index) => setActiveTab(index)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Content */}
      <div className="flex flex-col justify-center items-center mt-10">
        {message && (
          <div className="mb-4 text-center text-red-400 font-semibold z-10">
            {message}
          </div>
        )}
        {activeTab === 0 ? (
          <form
            className="bg-gray-900 p-6 rounded-2xl shadow-md w-96 z-10"
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            className="bg-gray-900 p-6 rounded-2xl shadow-md w-96 z-10"
            onSubmit={handleRegister}
          >
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="username"
              placeholder="Username"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-500 rounded hover:bg-green-600"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Auth;
