import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import api from "../api/axios";
import BlurText from "../ui/BlurText";
import { useNotes } from "../hooks/useNotes";
import LoadingOverlay from "./LoadingOverlay";

function NotesContainer({inputValue}) {
  const { notes, loading } = useNotes();

  if (loading) return <LoadingOverlay message="Loading your notes..." />;

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
      {notes.filter(note => 
        note.title.toLowerCase().includes(inputValue.toLowerCase()) ||
        note.content.toLowerCase().includes(inputValue.toLowerCase()) ||
        note.category.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((note, index) => (
        <NoteCard
          key={index}
          title={note.title}
          body={note.content}
          captionText={note.category}
          color={note.color}
        />
      ))}
    </div>
  );
}

export default NotesContainer;
