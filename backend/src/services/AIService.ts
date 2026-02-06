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

  public async classifyIntent(): Promise<{ intent: "CHAT" | "EDIT" }> {
    const model = await generateText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.intent,
      output: Output.object({
        schema: z.object({
          intent: z.enum(["CHAT", "EDIT"]),
        }),
      }),
    });

    return JSON.parse(model.text);
  }

  public async streamResponseQuery() {
    const result = streamText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.chat,
      onChunk: (chunk) => {
        console.log(chunk);
      },
    });
    result.pipeUIMessageStreamToResponse(this.res);
  }

  public async streamEdits() {
    const flowchart = streamText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.edit,
      output: Output.object({
        schema: z.array(flowchartOperationSchema),
      }),
      onChunk: (chunk) => {
        console.log(chunk);
      },
    });

    flowchart.pipeUIMessageStreamToResponse(this.res);
  }

  private async generateEditPrompt() {}
}

export default AIService;
