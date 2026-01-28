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
    sendMessage(message);
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
        <PromptInputTools></PromptInputTools>
        <PromptInputSubmit disabled={!text && !status} status={status} />
      </PromptInputFooter>
    </PromptInput>
  );
};

export default AppPromptInput;
