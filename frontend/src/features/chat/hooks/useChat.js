import {
  addMessages,
  addNewMessage,
  createNewChat,
  setChats,
  setCurrentChatId,
  setError,
  setLoading,
} from "../chat.slice.js";
import { getChats, getMessages, sendMessage } from "../services/chat.api.js";
import { initializeSocketConnection } from "../services/chat.service.js";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    try {
      dispatch(setLoading(true));
      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      if (!chatId)
        dispatch(
          createNewChat({
            chatId: chat._id,
            title: chat.title,
          }),
        );
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: message,
          role: "user",
        }),
      );
      dispatch(
        addNewMessage({
          chatId: chatId || chat._id,
          content: aiMessage.content,
          role: aiMessage.role,
        }),
      );
      dispatch(setCurrentChatId(chat._id));
    } catch (error) {
      dispatch(setError(error.data?.data?.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    try {
      dispatch(setLoading(true));
      const data = await getChats();
      const { chats } = data;
      dispatch(
        setChats(
          chats.reduce((acc, chat) => {
            acc[chat._id] = {
              id: chat._id,
              title: chat.title,
              messages: [],
              lastUpdated: chat.updatedAt,
            };
            return acc;
          }, {}),
        ),
      );
    } catch (error) {
      dispatch(setError(error.data?.data?.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleOpenChat(chatId, chats) {
    try {
      dispatch(setLoading(true));
      if (chats[chatId]?.messages.length === 0) {
        const data = await getMessages(chatId);
        const { messages } = data;

        const formattedMessages = messages.map((msg) => ({
          content: msg.content,
          role: msg.role,
        }));

        dispatch(
          addMessages({
            chatId,
            messages: formattedMessages,
          }),
        );
      }
      dispatch(setCurrentChatId(chatId));
    } catch (error) {
      dispatch(setError(error.data?.data?.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    initializeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
