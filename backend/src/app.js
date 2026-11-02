import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

/**import routes */
import authRouter from "./routes/auth.routes.js";

/**use routes */
app.use("/api/auth", authRouter);

export default app;