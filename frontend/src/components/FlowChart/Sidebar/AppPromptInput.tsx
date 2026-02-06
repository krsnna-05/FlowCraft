import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSelect,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import type { ChatRequestOptions, ChatStatus, UIMessage } from "ai";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useState } from "react";

type AppPromptInputProps = {
  status: ChatStatus;
  sendMessage: (
    message: PromptInputMessage,
    options: ChatRequestOptions,
  ) => void;
  setMessages: (updater: (prev: UIMessage[]) => UIMessage[]) => void;
  stop: () => void;
};

const AppPromptInput = ({ status, sendMessage }: AppPromptInputProps) => {
  const [text, setText] = useState("");
  const [userQuery, setUserQuery] = useState<"ask" | "agent">("ask");

  const onSubmit = (message: PromptInputMessage) => {
    if (status === "streaming") stop();

    const body = {
      query: userQuery,
    };

    sendMessage(message, {
      body,
    });
    setText("");
  };
  return (
    <PromptInput onSubmit={onSubmit}>
      <PromptInputBody>
        <PromptInputTextarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Create a flowchart for ..."
        />
      </PromptInputBody>
      <PromptInputFooter>
        <ToggleGroup
          type="single"
          value={userQuery}
          onValueChange={(value) => {
            if (value) setUserQuery(value as "ask" | "agent");
          }}
          className=" border-2 border-border"
        >
          <ToggleGroupItem value="ask" aria-label="Ask mode">
            Ask
          </ToggleGroupItem>
          <ToggleGroupItem value="agent" aria-label="Agent mode">
            Agent
          </ToggleGroupItem>
        </ToggleGroup>
        <PromptInputSubmit disabled={!text && !status} status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default AppPromptInput;
