import React from "react";
import SplitText from "../ui/SplitText";
import GooeyNav from "../ui/GooeyNav";
import { Link } from "react-router-dom";

const items = [
  { label: "Login", href: "#" },
  { label: "Register", href: "#" },
];

function AuthNavBar() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <nav className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex Container */}
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <Link to={"/"}>
            <div className="flex items-center space-x-4">
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
            </div>
          </Link>

          <div className="relative">
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AuthNavBar;
