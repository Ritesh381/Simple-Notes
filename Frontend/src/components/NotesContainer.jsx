import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import BlurText from "../ui/BlurText";
import { useNotes } from "../hooks/useNotes";
import LoadingOverlay from "./LoadingOverlay";
import NoteCardBig from "./NoteCardBig";

function NotesContainer({ inputValue }) {
  const { notes, loading } = useNotes();
  const [showNote, setShowNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

   const close = () => {
    setShowNote(false);
    setSelectedNote(null);
  };


  if (loading) return <LoadingOverlay message="Loading your notes..." />;

  if (showNote && selectedNote){
    return <NoteCardBig note={selectedNote} onClose={close}/>
  }

 
  return (
    <div className="flex items-center justify-center min-h-screen p-10 gap-8 flex-wrap">
      {notes.length === 0 && (
        <BlurText
          text="What a fresh sheeeeet 😗"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className="text-5xl mb-8 z-1 text-white"
        />
      )}
      {notes
        .filter(
          (note) =>
            note.title.toLowerCase().includes(inputValue.toLowerCase()) ||
            note.content.toLowerCase().includes(inputValue.toLowerCase())
          //  || note.tags.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            body={
              note.short && note.short.length > 0 ? note.short : note.content
            }
            captionText={note.tags.length > 0 ? note.tags[0] : "No Tags"}
            color={note.color}
            onClick={() => {
              setSelectedNote(note);
              setShowNote(true);
            }}
          />
        ))}
    </div>
  );
}

export default NotesContainer;
