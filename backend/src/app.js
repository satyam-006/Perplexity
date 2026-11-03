import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(morgan("dev"));

/**import routes */
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";

/**use routes */
app.use("/api/auth", authRouter);
app.use("/api/chats", chatRouter);

export default app;
