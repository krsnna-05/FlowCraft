import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// type imports
import type { Request, Response } from "express";
import aiRouter from "./routes/AIroute.js";

// configures dotenv to work in your application
dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRouter);

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
