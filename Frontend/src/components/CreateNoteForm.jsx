import React, { useRef, useState, forwardRef } from "react";
import SpotlightCard from "../ui/SpotlightCard";
import { useNotes } from "../hooks/useNotes";
import { useUser } from "../hooks/useUsers";

const CreateNoteForm = forwardRef(({ onCancel, setColorPickerOpen }, ref) => {
  const colorInputRef = useRef(null);

  const { addNote } = useNotes();
  const { userId } = useUser().user;

  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#8b5cf6");
  const [category, setCategory] = useState("none");
  const [body, setBody] = useState("");

  const handleOpenColorPicker = () => {
    setColorPickerOpen(true);
    colorInputRef.current?.click();
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setColorPickerOpen(false); // closes automatically after selecting
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return; // safety check

    const note = {
      created_at: Date.now(),
      created_by: userId,
      title,
      color,
      category,
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
    setCategory("none");
    setBody("");
    onCancel();
  };

  return (
    <SpotlightCard
      ref={ref} // 👈 forward ref lands here
      className="custom-spotlight-card relative overflow-hidden"
      spotlightColor={`${color}40`}
    >
      <form
        onSubmit={handleSubmit}
        className="h-96 w-96 p-6 text-white flex flex-col gap-4"
      >
        {/* Title + Color */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-lg placeholder-white/60 outline-none border-none"
          />
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

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white/10 rounded-xl px-4 py-2 text-sm outline-none"
        >
          <option value="none">Category</option>
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="ideas">Ideas</option>
          <option value="others">Others</option>
        </select>

        {/* Body */}
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Take a note..."
          className="flex-1 w-full bg-white/10 rounded-xl px-4 py-3 outline-none resize-none placeholder-white/60"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-1">
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
