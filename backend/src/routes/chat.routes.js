import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
    deleteChat,
  getChats,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const chatRouter = Router();

/**
 * @route POST /api/chats/message
 * @desc Create a new chat
 * @access Private
 * @body {message: string}
 */

chatRouter.post("/message", authUser, sendMessage);

/**
 * @route GET /api/chats/
 * @desc Get all chats of the user
 * @access Private
 */

chatRouter.get("/", authUser, getChats);

/**
 * @route GET /api/chats/:chatId/messages
 * @desc Get all messages of a chat
 * @access Private
 */

chatRouter.get("/:chatId/messages", authUser, getMessages);

/**
 * @ route DELETE /api/chats/:chatId
 * @desc Delete a chat
 * @access Private
 */

chatRouter.delete("/:chatId", authUser, deleteChat);

export default chatRouter;
