import React, { useRef, useState, forwardRef } from "react";
import SpotlightCard from "../ui/SpotlightCard";
import { useNotes } from "../hooks/useNotes";
import { useUser } from "../hooks/useUsers";
import { useEffect } from "react";

const CreateNoteForm = forwardRef(({ onCancel, setColorPickerOpen }, ref) => {
  const colorInputRef = useRef(null);

  const { addNote } = useNotes();
  const { userId } = useUser().user;

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(localStorage.getItem("noteTitle") || "");
    setColor(localStorage.getItem("noteColor") || "#8b5cf6");
    setTags(JSON.parse(localStorage.getItem("noteTags")) || []);
    setBody(localStorage.getItem("noteBody") || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("noteTags", JSON.stringify(tags));
  }, [tags]);

  const handleOpenColorPicker = () => {
    setColorPickerOpen(true);
    colorInputRef.current?.click();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setColorPickerOpen(false); // closes automatically after selecting
    localStorage.setItem("noteColor", e.target.value);
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

  // ✅ Remove a tag
  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // ✅ Edit a tag (click to put it back in input)
  const handleEditTag = (index) => {
    setTagInput(tags[index]);
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return; // safety check

    const note = {
      created_at: Date.now(),
      created_by: userId,
      title,
      color,
      tags,
      content: body,
    };

    try {
      addNote(note);
      handleCancel();
    } catch (err) {
      console.error("Error saving note:", err.response?.data || err.message);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setColor("#8b5cf6");
    setTags([]);
    setTagInput("");
    setBody("");
    onCancel();
    localStorage.removeItem("noteTitle");
    localStorage.removeItem("noteColor");
    localStorage.removeItem("noteTags");
    localStorage.removeItem("noteBody");
  };

  return (
    <SpotlightCard
      ref={ref}
      className="custom-spotlight-card relative overflow-hidden"
      spotlightColor={`${color}40`}
    >
      <form
        onSubmit={handleSubmit}
        className="h-[600px] w-[700px] p-6 text-white flex flex-col gap-4"
      >
        {/* Title + Color Picker */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              localStorage.setItem("noteTitle", e.target.value);
            }}
            placeholder="Title"
            className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-lg placeholder-white/60 outline-none border-none"
          />
          <div className="ml-3">
            <button
              type="button"
              onClick={handleOpenColorPicker}
              aria-label="Pick color"
              className="shrink-0 w-10 h-10 rounded-xl"
              style={{ background: color }}
            />
            <input
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={handleColorChange}
              className="sr-only"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white/10 rounded-xl px-3 py-2 flex flex-wrap gap-2 min-h-[50px] max-h-[3rem] overflow-y-auto">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="w-6 h-6 flex items-center justify-center rounded-full 
             transition-transform duration-200 hover:scale-110 
             hover:rotate-12 active:scale-95 text-black bg-white/10"
              >
                ✕
              </button>
            </span>
          ))}
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder={tags.length === 0 ? "Add tags..." : ""}
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Note Body */}
        <textarea
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            localStorage.setItem("noteBody", e.target.value);
          }}
          placeholder="Take a note..."
          className="flex-1 w-full bg-white/10 rounded-xl px-4 py-3 outline-none resize-none placeholder-white/60 overflow-y-auto"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl font-medium"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            }}
          >
            Save
          </button>
        </div>
      </form>
    </SpotlightCard>
  );
});

// add displayName to avoid React devtools warning
CreateNoteForm.displayName = "CreateNoteForm";

export default CreateNoteForm;
