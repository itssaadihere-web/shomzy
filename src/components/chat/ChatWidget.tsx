"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Minus } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Shomzy shopping assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) return null;

  const toggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && !isMinimized && (
        <div className="bg-white border border-gray-200 shadow-2xl w-80 sm:w-96 rounded-lg overflow-hidden mb-4 flex flex-col h-[500px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-brand-black text-brand-cream p-4 flex justify-between items-center cursor-pointer" onClick={toggleMinimize}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center mr-3">
                <span className="font-serif font-bold text-black text-xs">S</span>
              </div>
              <h3 className="font-bold font-serif tracking-wide">Shomzy Assistant</h3>
            </div>
            <div className="flex space-x-2">
              <button onClick={toggleMinimize} className="text-gray-400 hover:text-white transition-colors">
                <Minus className="h-5 w-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === "user" 
                    ? "bg-brand-gold text-brand-black rounded-tr-none font-medium" 
                    : "bg-white border border-gray-200 rounded-tl-none text-gray-800"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={sendMessage} className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold bg-transparent text-sm"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-brand-black text-brand-cream px-4 py-2 rounded-r-md hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="w-14 h-14 bg-brand-gold text-brand-black rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
      >
        {isOpen && !isMinimized ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}
