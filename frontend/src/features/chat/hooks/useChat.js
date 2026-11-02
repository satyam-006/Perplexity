import { initializeSocketConnection } from "../services/chat.service.js";

export const useChat = () => {
  return {
    initializeSocketConnection,
  };
};
