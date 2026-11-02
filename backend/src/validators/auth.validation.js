import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerValidator = [
  body("username").trim().isAlphanumeric().withMessage("Username must contain only letters and numbers"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  validate,
];

export const loginValidator = [
  body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
  body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  validate,
];