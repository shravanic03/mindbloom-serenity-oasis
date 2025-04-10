
import { cn } from "@/lib/utils";

type MessageType = "user" | "bot";

interface ChatMessageProps {
  type: MessageType;
  message: string;
  timestamp?: Date;
}

const ChatMessage = ({ type, message, timestamp }: ChatMessageProps) => {
  const isUser = type === "user";
  
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 mb-2",
          isUser
            ? "bg-mindbloom-purple text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        )}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <span className={cn("text-xs block mt-1", isUser ? "text-purple-100" : "text-gray-500")}>
            {new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
