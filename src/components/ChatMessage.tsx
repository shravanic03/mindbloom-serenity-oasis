import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

const ChatMessage = ({ type, message, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 mb-2 ${
          type === "user"
            ? "bg-PMHS-purple text-white rounded-br-none"
            : "bg-gray-100 text-gray-800 rounded-tl-none"
        }`}
      >
        <div
          className="whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: message }}
        />
        <div
          className={`text-xs mt-1 ${
            type === "user" ? "text-PMHS-purple-light" : "text-gray-500"
          }`}
        >
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
