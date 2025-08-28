import React from "react";

function NoteContent({ isEditing, content, setContent }) {
  return (
    <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full bg-transparent text-white outline-none border-none resize-none overflow-hidden"
          rows={Math.max(10, content.split("\n").length)}
        />
      ) : (
        <p className="text-gray-200 whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}

export default NoteContent;
