import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  // null = logged out
  // { userId, name, username, token } = logged in

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      api.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const login = (userData) => {
    // Map backend `id` -> frontend `userId`
    const formattedUser = {
      userId: userData.id,
      name: userData.name,
      username: userData.username,
      token: userData.token,
    };

    setUser(formattedUser);
    localStorage.setItem("user", JSON.stringify(formattedUser));

    // Set axios header for all future API requests
    if (formattedUser.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${formattedUser.token}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
