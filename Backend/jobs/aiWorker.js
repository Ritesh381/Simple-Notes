// worker.js
const jobQueue = require("./aiJobQueue"); // use relative path
const Note = require("../models/Note");
const { desc, summary, points, quiz, flash_card, short } = require("./Prompts");
const { generateAIResponse } = require("../services/gemini");

function cleanAIResponse(res) {
  try {
    if (!res) return null;

    // If AI flagged inappropriate content
    if (/inappropriate|not allowed|policy/i.test(res)) {
      return "❌ The given note contains inappropriate content so sadly the AI features cannot work.";
    }

    // Remove markdown fences
    const cleaned = res.replace(/```json|```/g, "").trim();

    // Try parse if JSON
    try {
      return JSON.parse(cleaned);
    } catch {
      return cleaned; // fallback to plain text
    }
  } catch (err) {
    console.error("❌ Failed to clean AI response:", err);
    return null;
  }
}

async function doWork(id) {
  try {
    const curr = await Note.findById(id);
    if (!curr) {
      console.log("Note not found for id:", id);
      return;
    }

    const user_content = `Title: ${curr.title} --////-- Tags: ${curr.tags} --////-- Note: ${curr.content}`;

    // Run all generations in parallel
    const [descRes, summaryRes, pointsRes, quizRes, flashRes, shortRes] =
      await Promise.allSettled([
        generateAIResponse(desc + user_content),
        generateAIResponse(summary + user_content),
        generateAIResponse(points + user_content),
        generateAIResponse(quiz + user_content),
        generateAIResponse(flash_card + user_content),
        generateAIResponse(short + user_content),
      ]);

    // Collect results (fulfilled only, cleaned)
    const updateData = {};
    if (descRes.status === "fulfilled")
      updateData.desc =
        cleanAIResponse(descRes.value) || "⚠️ Couldn’t generate description.";
    if (summaryRes.status === "fulfilled")
      updateData.summary =
        cleanAIResponse(summaryRes.value) ||
        "⚠️ Couldn’t generate summary & story.";
    if (pointsRes.status === "fulfilled")
      updateData.points =
        cleanAIResponse(pointsRes.value) || "⚠️ No bullet points generated.";
    if (quizRes.status === "fulfilled")
      updateData.quiz =
        cleanAIResponse(quizRes.value) || "⚠️ No quiz generated.";
    if (flashRes.status === "fulfilled")
      updateData.flash_cards =
        cleanAIResponse(flashRes.value) || "⚠️ No flashcards generated.";
    if (shortRes.status === "fulfilled")
      updateData.short =
        cleanAIResponse(shortRes.value) || "";
    // ✅ Fallbacks to avoid empty UI
    if (
      !updateData.points ||
      (Array.isArray(updateData.points) && updateData.points.length === 0)
    ) {
      updateData.points = ["⚠️ AI couldn’t generate points for this note."];
    }
    if (
      !updateData.flash_cards ||
      (Array.isArray(updateData.flash_cards) &&
        updateData.flash_cards.length === 0)
    ) {
      updateData.flash_cards = [
        { front: "N/A", back: "⚠️ AI couldn’t generate flashcards." },
      ];
    }

    // Update note in one query
    if (Object.keys(updateData).length > 0) {
      await Note.findByIdAndUpdate(id, updateData, { new: true });
      console.log("✅ Updated note:", id);
    } else {
      console.log("⚠️ No AI content generated for note:", id);
    }
  } catch (err) {
    console.error("❌ Error processing note id:", id, err);
  }
}

async function startWorker() {
  console.log("🚀 Worker started... ");
  while (true) {
    if (!jobQueue.isEmpty()) {
      const id = jobQueue.get();
      await doWork(id);
    } else {
      // Sleep for 1s if queue is empty
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

module.exports = startWorker;