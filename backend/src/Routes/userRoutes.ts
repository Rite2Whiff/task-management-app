import { Router } from "express";
import bcrypt from "bcrypt";
import { prismaClient } from "../prismaClient";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const router = Router();

router.post("/api/user/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (username || email || password) {
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

    if (!existingUser) {
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

router.post("/api/user/singin", async (req, res) => {
  const { username, password } = req.body;
  if (username || password) {
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
    const token = jwt.sign(
      { id: foundUser.id },
      process.env.JWT_SECRET as string
    );
    res.status(200).json({
      message: "You have successfully signed in",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while signing in. Please try again after few minutes",
    });
    console.log("Error", error);
  }
});

router.get("/api/user/:id", (req, res) => {});

router.get("api/user/:id/tasks", (req, res) => {});

export default router;
