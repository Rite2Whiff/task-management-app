import express from "express";
import userRoutes from "./Routes/userRoutes";
import taskRoutes from "./Routes/taskRoute";

const app = express();

app.use(userRoutes);
app.use(taskRoutes);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
