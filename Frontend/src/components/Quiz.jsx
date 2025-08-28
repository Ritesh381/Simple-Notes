import React, { useState } from "react";

function Quiz({ quizList }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const currentQuiz = quizList[current];

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleNext = () => {
    if (current < quizList.length - 1) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const score = quizList.filter(
    (q, idx) => answers[idx] === q.answer
  ).length;

  if (finished) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Quiz Finished!</h2>
        <p className="mb-6">Your Score: {score} / {quizList.length}</p>

        <div className="space-y-4">
          {quizList.map((q, idx) => (
            <div key={idx} className="p-3 border border-white/20 rounded-lg">
              <p className="font-medium">{idx + 1}. {q.question}</p>
              <p className="text-sm">
                ✅ Correct Answer: <span className="text-green-400">{q.answer}</span>
              </p>
              <p className="text-sm">
                📝 Your Answer:{" "}
                <span className={answers[idx] === q.answer ? "text-green-400" : "text-red-400"}>
                  {answers[idx] || "Not answered"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-4 font-medium">{current + 1}. {currentQuiz.question}</p>
      <div className="space-y-2 mb-4">
        {currentQuiz.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(opt)}
            className={`block w-full text-left px-3 py-2 rounded-lg border transition-colors ${
              answers[current] === opt
                ? opt === currentQuiz.answer
                  ? "bg-green-600 border-green-400"
                  : "bg-red-600 border-red-400"
                : "bg-transparent border-white/30 hover:border-indigo-400"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-lg bg-indigo-600"
        >
          {current === quizList.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
