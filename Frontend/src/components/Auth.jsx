import React, { useMemo, useState, useEffect } from "react";
import SplitText from "../ui/SplitText";
import GooeyNav from "../ui/GooeyNav";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUsers";
import Login from "./Login";
import Register from "./Register";

const items = [
  { label: "Login", href: "#" },
  { label: "Register", href: "#" },
];

function Auth() {
  const [activeTab, setActiveTab] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const userId = user?.userId;
  const [color, setColor] = useState("red");

  const splitTextElement = useMemo(
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
      />
    ),
    []
  );

  useEffect(() => {
    console.log("Current userId:", userId);
  }, [userId]);

  // Already logged in
  if (userId) {
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
                logout();
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
          <div
            className={`mb-4 text-center text-${color}-400 font-semibold z-10`}
          >
            {message}
          </div>
        )}
        {activeTab === 0 ? (
          <Login setMessage={setMessage} setColor={setColor} />
        ) : (
          <Register setMessage={setMessage} setColor={setColor} />
        )}
      </div>
    </div>
  );
}

export default Auth;
