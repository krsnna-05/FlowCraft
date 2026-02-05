import type { Request, Response } from "express";
import AIService from "../services/AIService.js";

const ChatController = async (req: Request, res: Response) => {
  const { messages } = req.body;

  const aiService = new AIService(messages);

  const intentObj = await aiService.classifyIntent();

  console.log("Classified Intent:", intentObj.intent);

  if (intentObj.intent === "CHAT") {
    await aiService.streamResponseQuery(messages, res);
  }

  if (intentObj.intent === "EDIT") {
    const flowchart = await aiService.generateEdits();
    console.log("Generated Flowchart:", flowchart);
  }
};

export default ChatController;
