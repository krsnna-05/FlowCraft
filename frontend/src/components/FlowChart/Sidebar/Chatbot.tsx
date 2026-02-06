import AppPromptInput from "./AppPromptInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import AppConversation from "./AppConversation";
import { useEffect, useRef, useState } from "react";
import useReactFlowStore from "@/store/ReactFlowStore";

const Chatbot = () => {
  const { status, sendMessage, setMessages, messages, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:3000/api/ai/chat",
    }),
  });

  const { addEdge, addNode } = useReactFlowStore();

  const [userQuery, setUserQuery] = useState<"ask" | "agent">("ask");

  const bufferRef = useRef("");
  const braceCountRef = useRef(0);
  const inStringRef = useRef(false);
  const lastLengthRef = useRef(0);

  const processText = (fullText: string) => {
    const delta = fullText.slice(lastLengthRef.current);
    lastLengthRef.current = fullText.length;

    for (let i = 0; i < delta.length; i++) {
      const char = delta[i];
      bufferRef.current += char;

      if (char === '"' && delta[i - 1] !== "\\") {
        inStringRef.current = !inStringRef.current;
      }

      if (!inStringRef.current) {
        if (char === "{") braceCountRef.current++;
        if (char === "}") braceCountRef.current--;
      }

      // ✅ one full JSON object ready
      if (
        braceCountRef.current === 0 &&
        bufferRef.current.trim().startsWith("{")
      ) {
        const jsonText = bufferRef.current.trim();
        bufferRef.current = "";

        try {
          const operation = JSON.parse(jsonText);
          console.log("✅ COMPLETE OPERATION:", operation);

          // Process flowchart operations
          if (operation.operation === "ADD_NODE" && operation.nodeData) {
            const { id, type, label, pos } = operation.nodeData;
            addNode({
              id,
              type,
              position: pos,
              data: {
                label,
                handleOrientation:
                  type === "vertical" ? "vertical" : "horizontal",
              },
            });
          } else if (operation.operation === "ADD_EDGE" && operation.edgeData) {
            const { id, sourceId, targetId } = operation.edgeData;
            addEdge({
              id,
              source: sourceId,
              target: targetId,
            });
          }
        } catch {
          console.warn("Invalid JSON skipped");
        }
      }
    }
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;
    if (userQuery === "ask") return;
    if (lastMessage.role !== "assistant") return;

    for (const part of lastMessage.parts ?? []) {
      if (part.type === "text" && part.state === "streaming") {
        processText(part.text);
        console.log(part.text);
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
