import React from "react";

function Tag({ content, color, onRemove }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${color} text-white`}
    >
      {onRemove && (
          <button
          onClick={onRemove}
          className="ml-1 text-[10px] leading-none focus:outline-none"
          >
          ✕
        </button>
      )}
      {content}
    </span>
  );
}

export default Tag;
