// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignupSuggestion from "./components/SignupSuggestion";
import NotesContainer from "./components/NotesContainer";
import Login from "./components/Login";
import DotGrid from "./ui/DotGrid";
import CreateNote from "./components/CreateNote";

function App() {
  const [showCreateNote, setShowCreateNote] = useState(false);
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        style={{ width: "100%", height: "100%", position: "absolute", zIndex:0}}
        className="bg-black"
      >
        <DotGrid
          dotSize={4}
          gap={15}
          baseColor="#241F1F"
          activeColor="#5227FF"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Foreground (your routes) */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar onAddNote={()=>setShowCreateNote(true)}/>
                <SignupSuggestion />
                <NotesContainer />
                {showCreateNote && (
                  <CreateNote onClose={() => setShowCreateNote(false)} />
                )}
              </>
            }
          />
          <Route path="/auth" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
