import { Router } from "express";
import bcrypt from "bcrypt";
import { prismaClient } from "../prismaClient";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthMiddleware } from "../authMiddleware";
dotenv.config();

const router = Router();

router.post("/api/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({
      message: "Please provide the necessary details ",
    });
    return;
  }

  try {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      res.status(400).json({
        message:
          "The username or email is already in use. Please provie a unique username and email",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "You have successfully signed up",
      userId: user.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error signing up. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.post("/api/user/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Please provide the necessary details ",
    });
    return;
  }

  try {
    const foundUser = await prismaClient.user.findFirst({
      where: {
        username,
      },
    });
    if (!foundUser) {
      res.status(404).json({
        message: "user not found",
      });
      return;
    }

    const verifyPassword = await bcrypt.compare(password, foundUser.password);

    if (!verifyPassword) {
      res.status(404).json({
        message: "Unauthorized",
      });
      return;
    }
    const accessToken = jwt.sign(
      { id: foundUser.id },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/api/user/refresh-token",
    });

    res.status(200).json({
      message: "You have successfully signed in",
      accessToken,
      user: foundUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while signing in. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.post("/api/user/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token" });
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        res.status(403).json({ message: "Invalid or expired refresh token" });
        return;
      }
      const newAccessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "15m" }
      );
      res.json({
        accessToken: newAccessToken,
      });
    }
  );
});

router.get("/api/user", AuthMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({
        message: "No user found",
      });
      return;
    }
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding the user. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.get("/api/user/tasks", AuthMiddleware, async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }

  try {
    const tasks = await prismaClient.task.findMany({
      where: { userId },
    });
    if (!tasks) {
      res.status(404).json({
        message: "No tasks found",
      });
      return;
    }
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding the tasks. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

export default router;
