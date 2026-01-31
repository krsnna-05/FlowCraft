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

  if (intentObj.intent === "CHAT") {
    await aiService.streamResponseQuery(messages, res);
  }

  if (intentObj.intent === "EDIT") {
    const flowchart = await aiService.generateEdits();
    console.log("Generated Flowchart:", flowchart);
  }
};

export default ChatController;
