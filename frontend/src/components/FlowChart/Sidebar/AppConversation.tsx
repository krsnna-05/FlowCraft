import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { UIMessage } from "ai";
import { Zap, Edit3, GitBranch } from "lucide-react";

type AppConversationProps = {
  messages: UIMessage[];
};

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-8 px-4 py-12 text-center">
    {/* Header */}
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900">Welcome to FlowCraft</h2>
      <p className="text-gray-600">AI-assisted visual flowchart generator</p>
    </div>

    {/* Main Message */}
    <div className="max-w-sm space-y-4">
      <p className="text-base text-gray-700">
        Describe your flowchart in natural language and let AI generate it for
        you
      </p>
    </div>

    {/* Features */}
    <div className="w-full max-w-sm space-y-3 rounded-lg bg-gray-50 p-5">
      <div className="flex items-start gap-3">
        <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">Instant Generation</h3>
          <p className="text-xs text-gray-600">
            AI creates a structured flowchart from your description
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Edit3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">Full Control</h3>
          <p className="text-xs text-gray-600">
            Edit nodes, connections, and layout freely on canvas
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <GitBranch className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
        <div className="text-left">
          <h3 className="font-semibold text-gray-900">Iterate & Refine</h3>
          <p className="text-xs text-gray-600">
            Edit your prompt and regenerate anytime
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AppConversation = ({ messages }: AppConversationProps) => {
  return (
    <Conversation className="flex-1 overflow-y-auto">
      <ConversationContent>
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <MessageResponse key={`${message.id}-${i}`}>
                          {part.text}
                        </MessageResponse>
                      );
                    default:
                      return null;
                  }
                })}
              </MessageContent>
            </Message>
          ))
        )}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};

export default AppConversation;
