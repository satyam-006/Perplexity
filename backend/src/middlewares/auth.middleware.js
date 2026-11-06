import jwt from "jsonwebtoken";
import { redis } from "../config/cache.js";

export const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
      error: "Token not provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token)

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid token",
      success: false,
      error: error.message,
    });
  }
};
