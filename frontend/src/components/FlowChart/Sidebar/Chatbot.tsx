import AppPromptInput from "./AppPromptInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import AppConversation from "./AppConversation";
import { useEffect, useState } from "react";

const Chatbot = () => {
  const { status, sendMessage, setMessages, messages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api/ai/chat",
    }),
  });

  const [userQuery, setUserQuery] = useState<"ask" | "agent">("ask");

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (lastMessage?.role === "user") return;

    for (const part of lastMessage.parts ?? []) {
      console.log("PART TYPE:", part.type);

      if (part.type === "text") {
        console.log("STATE:", part.state);
        console.log("TEXT SO FAR:\n", part.text);
      }
    }
  }, [messages]);

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
