import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "@/lib/mentalHealthData";
import { chatStore, assessmentStore, type ChatMessage } from "@/lib/store";
import { Send, Trash2 } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatStore.getAll());
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Get latest assessment risk level for context
  const assessments = assessmentStore.getAll();
  const latestRisk = assessments.length > 0 ? assessments[assessments.length - 1].level : undefined;

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text, timestamp: new Date().toISOString() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    chatStore.add(userMsg);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getChatResponse(text, latestRisk);
      const botMsg: ChatMessage = { id: crypto.randomUUID(), role: "bot", content: response, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, botMsg]);
      chatStore.add(botMsg);
      setTyping(false);
    }, 800 + Math.random() * 700);
  };

  const clearChat = () => {
    chatStore.clear();
    setMessages([]);
  };

  return (
    <div className="container max-w-2xl py-8 flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold">Emotional Support Chat</h1>
          <p className="text-xs text-muted-foreground">Empathetic, non-medical support. Not a substitute for professional help.</p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-muted transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg mb-2">👋 Hi there!</p>
            <p className="text-sm">I'm here to listen. Share how you're feeling, and I'll do my best to support you.</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "gradient-calm text-primary-foreground rounded-br-md"
                  : "bg-card border rounded-bl-md"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-card border px-4 py-3 rounded-2xl rounded-bl-md">
              <span className="animate-pulse-gentle text-muted-foreground text-sm">Typing...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          placeholder="Share how you're feeling..."
          className="flex-1 bg-card border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="gradient-calm text-primary-foreground p-3 rounded-lg disabled:opacity-30 transition-transform hover:scale-105"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
