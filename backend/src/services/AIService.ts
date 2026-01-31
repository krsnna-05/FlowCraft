import {
  convertToModelMessages,
  generateText,
  streamText,
  UIMessage,
  Output,
} from "ai";
import { ollama } from "ai-sdk-ollama";
import { z } from "zod";
import systemPrompts from "../systemPrompts/system.json" with { type: "json" };
import { Response } from "express";
import { flowchartSchema } from "../controllers/flowchartTypes.js";

class AIService {
  public messages: UIMessage[];

  constructor(messages: UIMessage[]) {
    this.messages = messages;
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

  public async streamResponseQuery(messages: UIMessage[], res: Response) {
    const result = streamText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(messages),
      system: systemPrompts.chat,
    });

    result.pipeUIMessageStreamToResponse(res);
  }

  public async generateEdits(): Promise<z.infer<typeof flowchartSchema>> {
    const flowchart = await generateText({
      model: ollama("ministral-3:3b"),
      prompt: await convertToModelMessages(this.messages),
      system: systemPrompts.edit,
      output: Output.object({
        schema: flowchartSchema,
      }),
    });

    return JSON.parse(flowchart.text);
  }

  private async generateEditPrompt() {}
}

export default AIService;
