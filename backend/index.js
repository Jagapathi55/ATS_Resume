import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./dbConnection.js";

import userRoute from "./routes/userRoute.js";
import resumeRoute from "./routes/resumeRoute.js";
import aiRoute from "./routes/aiRoute.js";
import uploadRoute from "./routes/uploadRoute.js";
import atsRoute from "./routes/atsRoute.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

import { logger, errorHandler, validation } from "./middlewear.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/auth", userRoute);

app.use("/resume", resumeRoute);

app.use("/api/ai", aiRoute);

app.use("/ats", atsRoute);

app.use("/upload", uploadRoute);

app.use("/feedback", feedbackRoutes);

app.use(errorHandler);

connectDB().then(() => {
  app.listen(5000, () => console.log("Server running on 5000"));
});
