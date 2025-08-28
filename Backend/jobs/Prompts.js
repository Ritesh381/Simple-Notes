// Prompts.js
// IMPORTANT: The user’s note will be appended AFTER this prompt by your code as:
//   Title: <title> --////-- Tags: <comma,separated,tags> --////-- Note: <free text>
// Follow the rules below exactly. Never include any extra commentary, preface, or metadata.

// -------------------- DESC (extended, descriptive markdown) --------------------
const desc = `
You are an expert note-writer. Create an *extended, descriptive* explanation of the user's content in **Markdown**.
Style: clear headings, concise subheadings, short paragraphs, occasional analogies, and up to two light jokes.
If helpful, add simple visuals such as:
- a short table (Markdown table)
- a simple list
- a small ASCII sketch or a Mermaid diagram (but do NOT include any external image URLs)

Safety & filtering:
- If the user content contains disallowed, explicit, or unsafe topics (e.g., detailed violence, sexual content, illegal instructions, highly sensitive PII), OMIT those parts.
- If a substantial portion of the note is unsafe (rough guideline: more than ~30%), return EXACTLY:
The given note contains inappropriate content so sadly the AI features cannot work

Formatting contract (MUST follow):
- Output must be **only** the markdown text (a single string). No JSON, no code fences around the entire output, no leading or trailing explanations.
- Keep it engaging with occasional analogy and at most two light jokes.

Begin.
`;

// -------------------- SUMMARY (short summary + mini-story, both in one string) --------------------
const summary = `
Create a **Markdown** output that contains two sections for the user's content:

### Quick Summary
- One to four short paragraphs (based on how big the data is) summarizing the main ideas in a friendly, clear tone.

### Mini-Story
- A short, imaginative story (about 120–200 words) that teaches the same idea with a relatable analogy.
- Include up to one light, family-friendly joke.

Safety & filtering:
- If the user content contains disallowed, explicit, or unsafe topics (e.g., detailed violence, sexual content, illegal instructions, highly sensitive PII), OMIT those parts.
- If a substantial portion of the note is unsafe (rough guideline: more than ~30%), return EXACTLY:
The given note contains inappropriate content so sadly the AI features cannot work

Formatting contract (MUST follow):
- Output is **only** markdown text (a single string). No JSON, no extra commentary.

Begin.
`;

// -------------------- POINTS (return ONLY a JSON array of strings) --------------------
const points = `
Extract the 5–8 most important takeaways from the user's content.
Return **ONLY** a valid JSON array of short strings (no key names, no object wrapper, no trailing text).
Each string should be concise (<= 140 chars), may use light markdown (bold/italics/inline code), and can use a simple analogy or a mild joke (sparingly).

Examples of valid responses:
["Point A", "Point B", "Point C", "Point D", "Point E"]

Safety & filtering:
- If unsafe sections exist, ignore them.
- If the content is largely unsafe, return an **empty JSON array**: []

Formatting contract (MUST follow):
- Output must be a JSON array of strings only. No backticks, no prose, no code fences.

Begin.
`;

// -------------------- QUIZ (array of MCQs) --------------------
const quiz = `
Generate **3–5 multiple-choice questions** based on the user's content.
Return **ONLY** a JSON array where each item has exactly:
{
  "question": "<string>",
  "options": ["<A>", "<B>", "<C>", "<D>"],
  "answer": "<one of the options exactly>"
}

Example:
[
  {
    "question": "What does X do?",
    "options": ["A1","B1","C1","D1"],
    "answer": "B1"
  },
  {
    "question": "Which statement is true?",
    "options": ["A2","B2","C2","D2"],
    "answer": "D2"
  }
]

Safety & filtering:
- Do not generate questions on unsafe/disallowed content.
- If the content is largely unsafe, return [].

Formatting contract (MUST follow):
- Output must be a JSON array only. No backticks, no prose, no code fences.

Begin.
`;

// -------------------- FLASH CARDS (array of {front,back}) --------------------
const flash_card = `
Create **3–6 flashcards** to study the user's content.
Return **ONLY** a JSON array of objects with the exact keys "front" and "back".
Keep each side succinct; the back should be a clear answer or definition.

Example:
[
  { "front": "Term A", "back": "Short definition of Term A" },
  { "front": "Process B", "back": "One-sentence explanation of Process B" }
]

Safety & filtering:
- Do not include unsafe/disallowed content.
- If the content is largely unsafe, return [].

Formatting contract (MUST follow):
- Output must be a JSON array only. No backticks, no prose, no code fences.

Begin.
`;

const short = `Create a very short summary of the content provided (70-100 words), giving the rough idea of what the content is about.

Safety & filtering:
- If the user content contains disallowed, explicit, or unsafe topics (e.g., detailed violence, sexual content, illegal instructions, highly sensitive PII), OMIT those parts.
- If a substantial portion of the note is unsafe (rough guideline: more than ~30%), return empty string

Formatting contract (MUST follow):
- Output is **only** markdown text (a single string). No JSON, no extra commentary.

Begin.
`;

module.exports = { desc, summary, points, quiz, flash_card, short };

// `Computer Networks

// IP Address:
// 	Unique identifier for a device connected to a network
// 	a.b.c.d (each number is of 8 bit) (0-255)

// Limitation:
// 	2^32 ip addresses can be assigned, means 4.3 billion
// 	there are a lot of devices, so it hits the limit.

//  - We need to increase the limit. The a.b.c.d is called IPv4
//  - So now we use IPv6
//  	- it is a 128bit number.

// OSI model (Open system inter communication)
// - Idea behind it was to divide big networks into smaller ones
// - 7 layers
// - Conceptual model, a bunch of software that exists in the OS which works as a layer.
// - Every layer is independent for errors and debugging.

// 1.  App layer (layer 7)
// 	- Provide network services for every user and app. Example: HTTP requests.
// 2.  Presentation Layer (layer 6)
// 	- It handles things like encryption/ compression/ formatting. Example: SSL / TLS
// 3.  Session Layer (layer 5)
// 	- manages sessions (connection between user and server for a period of time).
// 4.  Transport Layer (layer 4)
// 	- reliable data delivery. Example: TCP
// 5.  Network Layer (layer 3)
// 	- route your data in most efficient form. Example: IP,
// 6.  Data link Layer (layer 2)
// 	- data communication between 2 directly connected devices. Example: MAC address.
// 7.  Physical Layer (layer 1)
// 	- Handles actual data transmission (Hardware)

// IP Suite (modern version of OSI model)
// App(app, presentation, session) -> Transport -> Internet -> Link (data, physical)`;
