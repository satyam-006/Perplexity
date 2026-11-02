import { Router } from "express";
import {
  getMeController,
  loginController,
  registerController,
  verifyEmailController,
} from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validation.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authRouter.post("/register", registerValidator, registerController);

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 * @body { email, password }
 */

authRouter.post("/login", loginValidator, loginController);

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */
authRouter.get("/verify-email", verifyEmailController);

/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's information
 * @access Private
 * @cookie { token }
 */

authRouter.get("/get-me", authUser,getMeController);

export default authRouter;
