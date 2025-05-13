"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userJson = localStorage.getItem("user");
    const User = userJson ? JSON.parse(userJson) : [];
    const userId = User.id;
    const socketIo = io(
      "https://task-management-app-production-0bf2.up.railway.app",
      {
        auth: { token },
      }
    );

    socketIo.on("connect", () => {
      if (userId) {
        socketIo.emit("register", userId);
      }
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
