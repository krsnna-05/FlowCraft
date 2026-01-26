import React from "react";
import AppPromptInput from "./AppPromptInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const Chatbot = () => {
  const { status, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/ai/chat",
    }),
  });

  return (
    <div>
      <AppPromptInput
        status={status}
        sendMessage={sendMessage}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Chatbot;
