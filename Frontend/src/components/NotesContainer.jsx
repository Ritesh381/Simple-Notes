import React, { useState } from "react";
import NoteCard from "./NoteCard";

const notesData = [
  {
    title: "First Note",
    body: "This is the body of the first note.",
    captionText: "Created on 2023-10-01",
    color: "#fde047",
  },
  {
    title: "Second Note",
    body: "This is the body of the second note.",
    captionText: "Created on 2023-10-02",
    color: "#60a5fa",
  },
  {
    title: "Third Note",
    body: "This is the body of the third note.",
    captionText: "Created on 2023-10-03",
    color: "#4ade80",
  },
];

function NotesContainer() {
  const [notes, setNotes] = useState(notesData);

  return (
    <div className="flex items-center justify-center min-h-screen p-10 gap-8 flex-wrap">
      {notes.map((note, index) => (
        <NoteCard
          key={index}
          title={note.title}
          body={note.body}
          captionText={note.captionText}
          color={note.color}
        />
      ))}
    </div>
  );
}

export default NotesContainer;
