import React, { useRef, useState } from "react";
import ShapeBlur from "../ui/ShapeBlur";
import CreateNoteForm from "./CreateNoteForm";
import Magnet from "../ui/Magnet";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUsers";

function CreateNote({ onClose }) {
  const cardRef = useRef(null);
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const { user } = useUser();

  const handleOverlayClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      if (isColorPickerOpen) {
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
      {!(user && user.userId) ? (
        <div ref={cardRef} className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="mb-6">You need to be logged in to create a note.</p>
          <div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
            <Magnet padding={100} disabled={false} magnetStrength={1}>
              <Link to={"/auth"}>
                <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                  Login
                </button>
              </Link>
            </Magnet>
          </div>
        </div>
      ) : (
        <div ref={cardRef}>
          <div className="absolute inset-0 pointer-events-none">
            <ShapeBlur
              variation={0}
              pixelRatioProp={window.devicePixelRatio || 1}
              shapeSize={1.2}
              roundness={0.5}
              borderSize={0.05}
              circleSize={0.5}
              circleEdge={1}
            />
          </div>

          <CreateNoteForm
            onCancel={onClose}
            setColorPickerOpen={setColorPickerOpen}
          />
        </div>
      )}
    </div>
  );
}

export default CreateNote;
