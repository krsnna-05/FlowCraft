import AppPromptInput from "./AppPromptInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import AppConversation from "./AppConversation";
import { useState } from "react";

const Chatbot = () => {
  const { status, sendMessage, setMessages, messages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api/ai/chat",
    }),
  });

  const [userQuery, setUserQuery] = useState<"ask" | "agent">("ask");

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <AppConversation messages={messages} />
      <AppPromptInput
        status={status}
        sendMessage={sendMessage}
        setMessages={setMessages}
        stop={stop}
        userQuery={userQuery}
        setUserQuery={setUserQuery}
      />
    </div>
  );
};

export default Chatbot;
