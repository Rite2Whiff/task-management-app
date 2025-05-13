"use client";
import { AuthContextType, User } from "@/types";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: null,
  allUsers: null,
  login: () => {},
  logout: () => {},
  getAllUsers: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    const allUsers = localStorage.getItem("allUsers");
    if (storedToken) setAccessToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (allUsers) setAllUsers(JSON.parse(allUsers));
  }, []);

  function login(token: string, user: User) {
    setAccessToken(token);
    setUser(user);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    getAllUsers();
  }

  async function getAllUsers() {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://ec2-3-111-39-63.ap-south-1.compute.amazonaws.com:3000/api/users",
      {
        headers: { Authorization: token },
      }
    );
    console.log(response.data);
    localStorage.setItem("allUsers", JSON.stringify(response.data.users));
  }

  function logout() {
    setAccessToken(null);
    setUser(null);
    setAllUsers(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tasks");
    localStorage.removeItem("allUsers");
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, logout, getAllUsers, allUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
