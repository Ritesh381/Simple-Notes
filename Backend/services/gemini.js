const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API);

async function generateAIResponse(prompt) {
  const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });
  const response = await model.generateContent(prompt);
  return response.response.text();
}

module.exports = { generateAIResponse };
