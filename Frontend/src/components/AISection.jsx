import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import FlashCards from "./FlashCards";
import Quiz from "./Quiz";

function AISection({ note }) {
  const tabs = ["Flash Cards", "Quiz", "Descriptive", "Summary", "Bullet Points"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Nav */}
      <nav className="relative w-full">
        <ul className="flex w-full border-b border-white/30">
          {tabs.map((tab, index) => (
            <li key={index} className="flex-1 text-center relative">
              <button
                onClick={() => setActiveTab(index)}
                className={`w-full py-3 text-lg font-medium transition-colors ${
                  activeTab === index ? "text-indigo-400" : "text-white"
                }`}
              >
                {tab}
              </button>
              {index < tabs.length - 1 && (
                <span className="absolute right-0 top-1/4 h-1/2 w-px bg-white/20"></span>
              )}
            </li>
          ))}
        </ul>

        {/* Underline Indicator */}
        <span
          className="absolute bottom-0 h-[2px] bg-indigo-400 transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(100 / tabs.length) * activeTab}%`,
          }}
        ></span>
      </nav>

      {/* Content */}
      <div className="p-6 text-lg">
        <div className="rounded-lg p-4 bg-transparent text-white text-left max-h-[400px] overflow-y-auto scrollbar-hide">
          {tabs[activeTab] === "Flash Cards" && (
            <FlashCards cards={note.flash_cards || []} />
          )}

          {tabs[activeTab] === "Quiz" && (
            <Quiz quizList={note.quiz || []} />
          )}

          {tabs[activeTab] === "Descriptive" && (
            <ReactMarkdown>{note.desc || "No description available."}</ReactMarkdown>
          )}

          {tabs[activeTab] === "Summary" && (
            <ReactMarkdown>{note.summary || "No summary available."}</ReactMarkdown>
          )}

          {tabs[activeTab] === "Bullet Points" && (
            <ul className="list-disc list-inside">
              {note.points?.length
                ? note.points.map((point, idx) => <li key={idx}>{point}</li>)
                : "No bullet points available."}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AISection;
