import {
  convertToModelMessages,
  generateText,
  streamText,
  UIMessage,
  Output,
  createUIMessageStream,
} from "ai";
import { ollama } from "ai-sdk-ollama";
import { z } from "zod";
import systemPrompts from "../systemPrompts/system.json" with { type: "json" };
import { Response } from "express";
import { flowchartOperationSchema } from "../controllers/flowchartTypes.js";

class AIService {
  public messages: UIMessage[];
  public res: Response;

  constructor(messages: UIMessage[], res: Response) {
    this.messages = messages;
    this.res = res;
  }

  public async streamResponseQuery() {
    const result = streamText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.chat,
    });
    result.pipeUIMessageStreamToResponse(this.res);
  }

  public async streamEdits() {
    const flowchart = streamText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.edit,
    });

    flowchart.pipeUIMessageStreamToResponse(this.res);
  }

  private async generateEditPrompt() {}
}

export default AIService;
