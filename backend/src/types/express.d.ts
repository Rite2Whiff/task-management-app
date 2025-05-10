// src/types/express.d.ts
import "express-serve-static-core";
import { Socket } from "socket.io";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const connectedUsers = new Map<string, string>();

interface AuthenticatedSocket extends Socket {
  userId?: string;
}
