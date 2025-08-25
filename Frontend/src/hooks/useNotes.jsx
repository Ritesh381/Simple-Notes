import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useUser } from "./useUsers";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.userId) {
      setLoading(true);
      fetchNotes(user.userId);
    } else {
      setNotes([]);
      setLoading(false);
    }
  }, [user]);

  const fetchNotes = async (userId) => {
    try {
      setLoading(true);
      const res = await api.get(`/notes`);
      setNotes(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setLoading(false);
    }
  };

  const addNote = async (note) => {
    if (!user?.userId) return;
    try {
      const res = await api.post("/notes", {
        ...note,
        created_by: user.userId,
      });
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const removeNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const updateNote = async (id, updatedFields) => {
    try {
      const res = await api.put(`/notes/${id}`, updatedFields);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, updateNote, loading }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
