import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "User with this username or email already exists",
      success: false,
      error: "User already exists",
    });
  }

  const user = await userModel.create({ username, email, password });

  const verificationToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
    <h1>Welcome, ${username}!</h1><p>Thank you for registering at Perplexity. We're excited to have you on board!</p>
    <p>To get started, please verify your email address by clicking the link below:</p>
    <a href="http://localhost:3000/api/auth/verify-email?token=${verificationToken}">Verify Email</a>
    `,
  });

  return res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
};

export const verifyEmailController = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({
      message: "Verification token is required",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
            <h1>Email Verified Successfully!</h1>
            <p>Login to your account to get started.</p>
            <a href="http://localhost:3000/api/auth/login">Login here</a>
        `;
    res.send(html);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired verification token",
      success: false,
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      error: "User not found",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid credentials",
      success: false,
      error: "Invalid credentials",
    });
  }

  if (!user.verified) {
    return res.status(403).json({
      message: "Email not verified",
      success: false,
      error: "Email not verified",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
};

export const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      error: "User not found",
    });
  }

  res.status(200).json({
    message: "User fetched successfully",
    success: true,
    user,
  });
};
