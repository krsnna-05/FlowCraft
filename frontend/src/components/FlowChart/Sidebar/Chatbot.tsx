import AppPromptInput from "./AppPromptInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import AppConversation from "./AppConversation";

const Chatbot = () => {
  const { status, sendMessage, setMessages, messages } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api/ai/chat",
    }),
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <AppConversation messages={messages} />
      <AppPromptInput
        status={status}
        sendMessage={sendMessage}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Chatbot;
