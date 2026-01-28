import { Router } from "express";
import ChatController from "../controllers/ChatController.js";

const aiRouter = Router();

aiRouter.post("/chat", ChatController);

export default aiRouter;
