import { Server } from "socket.io";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExtendedError } from "socket.io";
import { AuthenticatedSocket } from "./types/express";
dotenv.config();

export let io: Server;

export const connectedUsers: { [userId: string]: string } = {};

export function initSocket(server: any) {
  io = new Server(server, {
    cors: {
      origin: "https://task-management-app-psi-two.vercel.app",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket: AuthenticatedSocket, next: (err?: ExtendedError) => void) => {
    const token = socket.handshake.auth.token;
    console.log(token);

    if (!token) return next(new Error("No token provided"));

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as JwtPayload;
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`Registered user ${userId} with socket ${socket.id}`);
      console.log(connectedUsers);
    });

    socket.on("disconnect", () => {
      for (const userId in connectedUsers) {
        if (connectedUsers[userId] === socket.id) {
          delete connectedUsers[userId];
          break;
        }
      }
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
