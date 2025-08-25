import React, { useState } from "react";
import api from "../api/axios";
import LoadingOverlay from "./LoadingOverlay";

function Register({ setMessage, setColor }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation rules
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const conditionsMet = [hasUppercase, hasLowercase, hasNumber, hasSymbol].filter(Boolean).length;

  const isValid = password.length >= minLength && conditionsMet >= 3;

  // Strength bar (0 to 4)
  const strength = Math.min(conditionsMet, 4);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setMessage("");
    setLoading(true);
    try {
      await api.post("/auth/register", { username, pass: password, name });
      setMessage("Registration successful! You can login now.");
      setColor("green");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setColor("red");
      setLoading(false);
    }
  };

  if (loading) return <LoadingOverlay message="Registering your account..." />;

  return (
    <form
      className="bg-gray-900 p-6 rounded-2xl shadow-md w-96 z-10"
      onSubmit={handleRegister}
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-2 rounded bg-gray-800 border border-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Password Strength Bar */}
      <div className="w-full h-2 bg-gray-700 rounded mb-2">
        <div
          className={`h-2 rounded transition-all ${
            strength === 0
              ? "bg-red-500 w-1/12"
              : strength === 1
              ? "bg-red-500 w-1/4"
              : strength === 2
              ? "bg-yellow-500 w-2/4"
              : strength === 3
              ? "bg-blue-500 w-3/4"
              : "bg-green-500 w-full"
          }`}
        ></div>
      </div>

      {/* Checklist */}
      <div className="text-sm mb-3">
        <p className={password.length >= minLength ? "text-green-400" : "text-red-400"}>
          {password.length >= minLength ? "✔" : "✘"} Minimum {minLength} characters
        </p>
        <p className={hasUppercase ? "text-green-400" : "text-red-400"}>
          {hasUppercase ? "✔" : "✘"} At least one uppercase letter
        </p>
        <p className={hasLowercase ? "text-green-400" : "text-red-400"}>
          {hasLowercase ? "✔" : "✘"} At least one lowercase letter
        </p>
        <p className={hasNumber ? "text-green-400" : "text-red-400"}>
          {hasNumber ? "✔" : "✘"} At least one number
        </p>
        <p className={hasSymbol ? "text-green-400" : "text-red-400"}>
          {hasSymbol ? "✔" : "✘"} At least one symbol
        </p>
        <p className={conditionsMet >= 3 ? "text-green-400" : "text-red-400"}>
          {conditionsMet >= 3 ? "✔" : "✘"} At least 3 of the above conditions
        </p>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 rounded ${
          isValid
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        Register
      </button>
    </form>
  );
}

export default Register;
