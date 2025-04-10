
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatMessage from "@/components/ChatMessage";
import Button from "@/components/Button";
import { Send, PlusCircle, Loader2 } from "lucide-react";

const Chatbot = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [messages, setMessages] = useState<Array<{ type: "user" | "bot"; content: string; timestamp: Date }>>([
    {
      type: "bot",
      content: "Hello, I'm MindBloom's virtual assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    "I'm feeling anxious",
    "I'm having trouble sleeping",
    "I need help with stress",
    "I'm feeling sad today",
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = {
      type: "user" as const,
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate a response delay for realism
    setTimeout(() => {
      let botResponse = "";
      
      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes("anxious") || input.toLowerCase().includes("anxiety")) {
        botResponse = "Anxiety can be challenging. Some things that might help include deep breathing, physical activity, or limiting caffeine. Would you like me to suggest a specific breathing exercise?";
      } else if (input.toLowerCase().includes("sleep") || input.toLowerCase().includes("sleeping")) {
        botResponse = "Sleep difficulties are common. Have you tried establishing a regular sleep schedule? Also, reducing screen time before bed and creating a relaxing bedtime routine can be helpful.";
      } else if (input.toLowerCase().includes("stress")) {
        botResponse = "Managing stress is important for mental health. Consider practicing mindfulness, taking short breaks during the day, or engaging in activities you enjoy. Would you like to hear about a simple mindfulness exercise?";
      } else if (input.toLowerCase().includes("sad") || input.toLowerCase().includes("depression")) {
        botResponse = "I'm sorry you're feeling this way. Remember that it's okay to have these feelings. Reaching out to others, gentle physical activity, and self-compassion can help. Would you like me to connect you with one of our therapists?";
      } else {
        botResponse = "Thank you for sharing that with me. Would you like to explore some resources related to what you're experiencing, or would you prefer to book a session with one of our therapists?";
      }
      
      const botMessage = {
        type: "bot" as const,
        content: botResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-4 bg-mindbloom-purple text-white">
                <h1 className="text-xl font-semibold">MindBloom Assistant</h1>
                <p className="text-sm opacity-90">A supportive chat experience</p>
              </div>
              
              {/* Chat Messages Container */}
              <div className="h-[60vh] overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      type={message.type}
                      message={message.content}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 mb-2">
                        <Loader2 className="h-5 w-5 animate-spin text-mindbloom-purple" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Quick Prompts */}
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="text-xs px-3 py-1 rounded-full bg-mindbloom-purple/10 text-mindbloom-purple hover:bg-mindbloom-purple/20 transition-colors"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <textarea
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple resize-none"
                    placeholder="Type your message..."
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                    className="self-end"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  This is a simulated chatbot for demonstration purposes. For urgent mental health concerns, please contact a healthcare professional.
                </p>
              </div>
            </div>
            
            <div className="mt-8 bg-mindbloom-pink-light/30 p-6 rounded-xl border border-mindbloom-pink/10">
              <h2 className="text-lg font-semibold mb-3">Need more support?</h2>
              <p className="text-gray-700 mb-4">
                While our chatbot can provide basic guidance, it's not a replacement for professional help.
                If you're experiencing severe symptoms or need personalized support, consider booking a session with one of our therapists.
              </p>
              <Button variant="gradient" to="/appointment">
                <PlusCircle className="h-4 w-4 mr-2" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
