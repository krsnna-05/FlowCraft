import type { Request, Response } from "express";
import { streamText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { convertToModelMessages } from "ai";
import systemPrompts from "../systemPrompts/system.json" with { type: "json" };

const ChatController = async (req: Request, res: Response) => {
  const { messages } = req.body;

  const result = streamText({
    model: ollama("ministral-3:3b"),
    messages: await convertToModelMessages(messages),
    system: systemPrompts.intent.content,
    tools: {
      web_search: ollama.tools.webSearch({}),
    },
  });
  result.pipeUIMessageStreamToResponse(res);
};

export default ChatController;
