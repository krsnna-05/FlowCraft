import type { Request, Response } from "express";
import AIService from "../services/AIService.js";
import { UIMessage } from "ai";

const ChatController = async (req: Request, res: Response) => {
  const {
    messages,
    query,
  }: {
    messages: UIMessage[];
    query: "ask" | "agent";
  } = req.body;

  const aiService = new AIService(messages, res);

  if (query === "ask") {
    aiService.streamResponseQuery();
  }

  if (query === "agent") {
    aiService.streamEdits();
  }
};

export default ChatController;
