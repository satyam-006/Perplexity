import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const groqModel = new ChatGroq({
  model: "openai/gpt-oss-20b",
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateResponse(messages) {
  try {
    const response = await geminiModel.invoke(
      messages.map((msg) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        }
        if (msg.role === "ai") {
          return new AIMessage(msg.content);
        }
      }),
    );

    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
}

export async function generateTitle(message) {
  try {
    const response = await groqModel.invoke([
      new SystemMessage(`You are a helpful assistant that generates a title for a given message. 
          User will provide you with the first message of chat conversation, and you will generate a title that captures the essence of the conversation in a 2-4 words. The title should be relevant, engaging, and provide a clear idea of what the conversation is about.
          `),

      new HumanMessage(
        `Generate a concise and descriptive title for the following message: "${message}"`,
      ),
    ]);

    return response.text;
  } catch (error) {
    console.error("Error generating title:", error);
    throw new Error("Failed to generate title");
  }
}
