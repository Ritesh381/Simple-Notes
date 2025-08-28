import { useRef } from "react";

function DeleteConfirm({ onConfirm, onCancel }) {
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel(); // close if clicked outside
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-96 text-center"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Delete Note?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          This action cannot be undone. Are you sure you want to delete this note?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
                       text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;