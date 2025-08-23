import React, { useRef, useState } from "react";
import ShapeBlur from "../ui/ShapeBlur";
import CreateNoteForm from "./CreateNoteForm";

function CreateNote({ onClose }) {
  const cardRef = useRef(null);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);

  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      if (isColorPickerOpen) {
        // just close the color picker, not the whole form
        setColorPickerOpen(false);
      } else {
        onClose();
      }
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-50"
    >
      <div className="absolute inset-0 -z-10">
        <ShapeBlur
          variation={0}
          pixelRatioProp={window.devicePixelRatio || 1}
          shapeSize={0.85}
          roundness={0.5}
          borderSize={0.05}
          circleSize={0.5}
          circleEdge={1}
        />
      </div>

      <div ref={cardRef}>
        <CreateNoteForm onCancel={onClose} setColorPickerOpen={setColorPickerOpen} />
      </div>
    </div>
  );
}

export default CreateNote;
