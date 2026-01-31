import type { Request, Response } from "express";
import { smoothStream, streamText, ToolLoopAgent } from "ai";
import { ollama } from "ai-sdk-ollama";
import { convertToModelMessages } from "ai";
import systemPrompts from "../systemPrompts/system.json" with { type: "json" };
import AIService from "../services/AIService.js";

const ChatController = async (req: Request, res: Response) => {
  const { messages } = req.body;

  const aiService = new AIService(messages);

  const intentObj = await aiService.classifyIntent();
};

export default ChatController;
