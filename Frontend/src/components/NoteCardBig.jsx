import React, { useRef, useState } from "react";
import { useNotes } from "../hooks/useNotes";
import DeleteConfirm from "../ui/DeleteConfirm";
import NoteContent from "./NoteContent";
import AISection from "./AISection";

function getContrastColor(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "black" : "white";
}

function NoteCardBig({ note, onClose }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags || []);
  const [tagInput, setTagInput] = useState("");
  const textColor = getContrastColor(note.color);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showAI, setShowAI] = useState(false);

  const { removeNote, updateNote } = useNotes();
  const cardRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      onClose();
    }
  };

  // ✅ Handle tag input
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      // edit last tag
      e.preventDefault();
      const lastTag = tags[tags.length - 1];
      setTagInput(lastTag);
      setTags(tags.slice(0, -1));
    }
  };

  // remove tag
  const removeTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  // save note
  const handleSave = async () => {
    await updateNote(note._id, { ...note, title, content, tags });
    setIsEditing(false);
  };

  // delete note
  const handleDelete = async () => {
    await removeNote(note._id);
    onClose(); // close after deleting
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true); // just open modal
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
    setIsEditing(false);
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50"
    >
      <div
        ref={cardRef}
        className="rounded-2xl shadow-lg p-6 w-4/5 max-w-5xl mx-auto border border-white/30 
             h-[95%] flex flex-col"
      >
        {showDeleteConfirm && (
          <DeleteConfirm
            onConfirm={async () => {
              await handleDelete();
              setShowDeleteConfirm(false);
            }}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}

        <div className="flex justify-between items-start">
          {/* Title & Tags */}
          <div className="flex-1 space-y-3 text-white">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold bg-transparent border-b border-white/20 
                           focus:outline-none focus:border-indigo-400 w-full"
              />
            ) : (
              <h1 className="text-2xl font-bold">{title}</h1>
            )}

            {/* Tags */}
            <div
              className="bg-white/10 rounded-xl px-3 py-2 flex flex-wrap gap-2 
                            min-h-[50px] max-h-[3rem] overflow-y-auto"
              style={{
                backgroundColor: note.color,
                color: textColor,
                boxShadow: "0 7px 10px rgba(0, 0, 0, 0.25)",
              }}
            >
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 bg-white/20 px-3 py-1 
                             rounded-full text-sm"
                >
                  {tag}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => removeTag(idx)}
                      className="w-6 h-6 flex items-center justify-center rounded-full 
                                 transition-transform duration-200 hover:scale-110 
                                 hover:rotate-12 active:scale-95 text-black bg-white/10"
                    >
                      ✕
                    </button>
                  )}
                </span>
              ))}
              {isEditing && (
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder={tags.length === 0 ? "Add tags..." : ""}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              )}
            </div>
          </div>

          {/* AI Button*/}
          <button
            className=" top-4 right-4 bg-indigo-500 text-white px-4 py-2 rounded-xl 
             shadow hover:bg-indigo-600 transition"
            onClick={() => setShowAI(!showAI)}
          >
            AI
          </button>
        </div>

        <hr className="my-4 border-white/20" />

        {/* Content */}
        {showAI ? (
          <AISection note={note}/>
        ) : (
          <NoteContent
            isEditing={isEditing}
            content={content}
            setContent={setContent}
          />
        )}

        {/* Bottom Buttons */}
        {!showAI && (
          <div className="flex justify-end gap-3 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={() => handleCancel()}
                  className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteCardBig;
