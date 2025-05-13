import express from "express";
import http from "http";
import userRoutes from "./Routes/userRoutes";
import taskRoutes from "./Routes/taskRoute";
import cors from "cors";
import cookieParser from "cookie-parser";
import { initSocket } from "./socket";

const app = express();
const server = http.createServer(app);
initSocket(server);
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "https://task-management-app-psi-two.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());

app.use(userRoutes);
app.use(taskRoutes);

server.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
