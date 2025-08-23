import React from "react";
import { Plus, Search } from "lucide-react";
import ElectricBorder from "../ui/ElectricBorder";
import ClickSpark from "../ui/ClickSpark";
import SplitText from "../ui/SplitText";

function NavBar({ onAddNote }) {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <nav className="text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex Container */}
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <SplitText
              text="Simple Notes"
              className="text-2xl font-semibold text-center cursor-pointer"
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
            {/* Plus Button */}
            <button
              onClick={onAddNote}
              className="z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Right Section (Search) */}
          <div className="flex items-center space-x-2">
            <ElectricBorder
              color="#bbfab2ff"
              speed={2}
              chaos={0.2}
              thickness={15}
              style={{ borderRadius: 50 }}
            >
              <input
                type="text"
                placeholder="Search..."
                className="text-black px-4 py-2 rounded-xl border-none outline-none 
             bg-white/30 backdrop-blur-md shadow-md placeholder-gray-600"
              />
            </ElectricBorder>
            <ClickSpark
              sparkColor="#136fe7ff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <button className="flex items-center justify-center w-10 h-10 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition">
                <Search className="w-5 h-5" />
              </button>
            </ClickSpark>
          </div>
        </div>
      </div>

      {/* Mobile + Button */}
      <div className="px-4 pb-3 z-50">
        <button
          onClick={onAddNote}
          className="w-full flex items-center justify-center py-2 bg-blue-500 rounded-md hover:bg-blue-700 transition text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
