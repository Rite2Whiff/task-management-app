import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];

  if (!token) {
    res.status(401).json({
      message: "You are not authorized, no access token",
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;
    req.userId = decoded.id;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        res
          .status(401)
          .json({ message: "You are not authorized, no refresh token" });
        return;
      }
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;

        const newAccessToken = jwt.sign(
          { id: decodedRefresh.id },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );

        res.setHeader("Authorization", newAccessToken);

        req.userId = decodedRefresh.id;
        next();
      } catch (err) {
        res.status(403).json({
          message: "Invalid refresh token or expired",
        });
        return;
      }
    } else {
      res.status(401).json({
        message: "Invalid access token",
      });
      return;
    }
  }
}
