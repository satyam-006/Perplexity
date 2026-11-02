import { ChatGoogle } from "@langchain/google";

const model = new ChatGoogle({
    model: "gemini-3.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
});

export const testAI = async () => {
  console.log("Testing AI...");
  try {
    const response = await model.invoke("What is the capital of India");
    console.log("AI response:", response);
    console.log(response.text);
  } catch (error) {
    console.error("Error invoking the model:", error);
  }
};
