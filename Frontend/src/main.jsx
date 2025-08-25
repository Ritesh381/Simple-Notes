import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotesProvider } from "./hooks/useNotes";
import { UserProvider } from "./hooks/useUsers";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </UserProvider>
  </StrictMode>
);
