import React, { useState } from "react";
// No need to import custom CSS here, we'll use inline styles or Tailwind for most
// import "../css/FlashCards.css";

function FlashCards({ cards }) {
  const [flipped, setFlipped] = useState(Array(cards.length).fill(false));

  const toggleFlip = (index) => {
    setFlipped((prev) => {
      const newFlips = [...prev];
      newFlips[index] = !newFlips[index];
      return newFlips;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 min-h-screen bg-gray-900 justify-center items-center">
      {cards.map((card, idx) => (
        <div
          key={idx}
          onClick={() => toggleFlip(idx)}
          // Make cards larger and responsive
          className="w-full max-w-sm h-72 perspective cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
        >
          {/* Card Inner */}
          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              flipped[idx] ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className={`absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl p-6 card-face card-front overflow-auto ${flipped[idx] ? 'z-0' : 'z-10'}`}>
              <p className="text-xl font-semibold text-center">{card.front}</p>
            </div>

            {/* Back */}
            <div className={`absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 to-pink-600 text-white rounded-2xl shadow-2xl p-6 card-face card-back overflow-auto ${flipped[idx] ? 'z-10' : 'z-0'}`}>
              {/* Apply an additional rotateY(180deg) to the back content to make it readable */}
              <p className="text-xl text-center transform rotate-y-180">{card.back}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlashCards;
