import express from "express";
import userRoutes from "./Routes/userRoutes";
import taskRoutes from "./Routes/taskRoute";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(userRoutes);
app.use(taskRoutes);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
