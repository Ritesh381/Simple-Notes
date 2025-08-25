import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useUser } from "../hooks/useUsers";
import LoadingOverlay from "./LoadingOverlay";

function Login({ setMessage, setColor }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { username, pass: password });
      const data = res.data;
      setMessage("Login successful!");
      setColor("green")

      login({
        id: data.id,
        name: data.name,
        username: data.username,
        token: data.token,
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Login failed. Please try again."
      );
      setColor("red")
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay message="Logging you in..." />;

  return (
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
  );
}

export default Login;
