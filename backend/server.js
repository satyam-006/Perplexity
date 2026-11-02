import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/config/database.js";

import { testAI } from "./src/services/ai.service.js";


dotenv.config();
connectDB();
testAI();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
