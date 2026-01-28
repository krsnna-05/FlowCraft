import type { Request, Response } from "express";
import { streamText } from "ai";
import { ollama } from "ai-sdk-ollama";
import { convertToModelMessages } from "ai";
import { Readable } from "node:stream";

const ChatController = async (req: Request, res: Response) => {
  const { messages } = req.body;

  const result = await streamText({
    model: ollama("ministral-3:3b"),
    messages: await convertToModelMessages(messages),
  });

  const stream = result.textStream;

  for await (const chunk of stream) {
    console.log(chunk);
    res.write(chunk);
  }
};

export default ChatController;
