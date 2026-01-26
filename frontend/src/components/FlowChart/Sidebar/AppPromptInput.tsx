import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import type { ChatStatus, UIMessage } from "ai";

import { useState } from "react";

type AppPromptInputProps = {
  status: ChatStatus;
  sendMessage: (message: PromptInputMessage) => void;
  setMessages: (updater: (prev: UIMessage[]) => UIMessage[]) => void;
};

const AppPromptInput = ({
  status,
  setMessages,
  sendMessage,
}: AppPromptInputProps) => {
  const [text, setText] = useState("");

  const onSubmit = (message: PromptInputMessage) => {
    const generateId = () => {
      if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    };

    setMessages((prev: UIMessage[]) =>
      prev.concat({
        id: generateId(),
        role: "user",
        content: message.text,
        parts: [{ type: "text", text: message.text }],
      } as UIMessage),
    );
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
        <PromptInputTools></PromptInputTools>
        <PromptInputSubmit disabled={!text && !status} status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default AppPromptInput;
