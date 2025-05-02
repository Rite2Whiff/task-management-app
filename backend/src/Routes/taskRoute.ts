import { Router } from "express";
import { AuthMiddleware } from "../authMiddleware";
import { prismaClient } from "../prismaClient";
import { UpdateTaskInputs } from "../interface";

const router = Router();

router.use(AuthMiddleware);

router.post("/api/task", async (req, res) => {
  const userId = req.userId;
  const { title, description, priority, assignedToId, dueDate } = req.body;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }

  try {
    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        priority,
        userId,
        assignedToId,
        dueDate: dueDate,
        status: "PENDING",
      },
    });

    res.status(200).json({
      message: "This task has been created",
      taskId: task.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating task. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.put("/api/task/:id", async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;
  const inputs: UpdateTaskInputs = req.body;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }
  try {
    const filteredUpdates = Object.fromEntries(
      Object.entries(inputs).filter(([_, value]) => value !== undefined)
    );
    const task = await prismaClient.task.findFirst({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    if (!task) {
      res.status(404).json({
        message: "No task found",
      });
      return;
    }
    const updatedTask = await prismaClient.task.update({
      data: filteredUpdates,
      where: {
        id: task.id,
        userId,
      },
    });
    res.status(200).json({
      message: `Task with id ${updatedTask.id} has been updated`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the task. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.delete("/api/task/:id", async (req, res) => {
  const userId = req.userId;
  const { taskId } = req.body;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }

  try {
    await prismaClient.task.delete({
      where: {
        id: taskId,
        userId,
      },
    });
    res.status(200).json({
      message: "Task has been successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.get("/api/task/:id", async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.id;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }

  try {
    const task = await prismaClient.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
    if (!task) {
      res.status(404).json({
        message: "No task found",
      });
      return;
    }
    res.status(200).json({
      taskId: task.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding the task. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

export default router;
