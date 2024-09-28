"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Plus,
  Menu,
  X,
  Send,
  User,
  Bot,
  Copy,
  Check,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuditRequest } from "../hooks/useAuditRequest";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AuditEntry {
  id: string;
  messages: ChatMessage[];
  timestamp: Date;
}

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPushed, setIsPushed] = useState<number | null>(null);
  const codeRegex = /```rust\n([\s\S]*?)```/g;
  const parts = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setIsPushed(index);
    setTimeout(() => {
      setCopiedIndex(null);
      setIsPushed(null);
    }, 500);
  };

  while ((match = codeRegex.exec(message.content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <ReactMarkdown
          key={lastIndex}
          className="prose prose-invert prose-sm max-w-none text-zinc-300">
          {message.content.slice(lastIndex, match.index)}
        </ReactMarkdown>
      );
    }
    const code = match[1].trim();
    const matchIndex = match.index;
    parts.push(
      <div key={matchIndex} className="relative">
        <SyntaxHighlighter
          language="rust"
          style={vscDarkPlus}
          className="rounded-md my-2 pr-10">
          {code}
        </SyntaxHighlighter>
        <button
          onClick={() => handleCopy(code, matchIndex)}
          className={`absolute top-2 right-2 p-1 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 ${
            isPushed === matchIndex ? "scale-90" : "scale-100"
          }`}>
          {copiedIndex === matchIndex ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4 text-zinc-300" />
          )}
        </button>
      </div>
    );
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < message.content.length) {
    parts.push(
      <ReactMarkdown
        key={lastIndex}
        className="prose prose-invert prose-sm max-w-none text-zinc-300">
        {message.content.slice(lastIndex)}
      </ReactMarkdown>
    );
  }

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-6 relative`}>
      <div
        className={`flex ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        } items-start max-w-[80%]`}>
        <div
          className={`flex-shrink-0 ${
            message.role === "user" ? "ml-2" : "mr-2"
          }`}>
          {message.role === "user" ? (
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <User className="h-5 w-5 text-[#14F195]" />
            </div>
          ) : (
            <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Bot className="h-5 w-5 text-[#9945FF]" />
            </div>
          )}
        </div>
        <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
          <div className="p-4 text-sm leading-relaxed">{parts}</div>
        </div>
      </div>
    </div>
  );
};

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<AuditEntry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { result, isLoading, error, requestAudit } = useAuditRequest();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [currentChat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log("Submitting input:", input);

    const newMessage: ChatMessage = { role: "user", content: input };
    setCurrentChat((prev) => [...prev, newMessage]);

    try {
      await requestAudit(input);
      setInput(""); // Clear the input after sending
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "An error occurred while processing your request.",
      };
      setCurrentChat((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    if (result) {
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: result.message,
      };
      setCurrentChat((prev) => [...prev, assistantMessage]);

      const newEntry: AuditEntry = {
        id: Date.now().toString(),
        messages: [...currentChat, assistantMessage],
        timestamp: new Date(),
      };
      setHistory((prev) => [newEntry, ...prev]);
    }
  }, [result]);

  const startNewChat = () => {
    setCurrentChat([]);
  };

  const loadChatHistory = (entry: AuditEntry) => {
    setCurrentChat(entry.messages);
    setIsSidebarOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-zinc-900 text-zinc-50 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-zinc-950 transition-transform duration-300 ease-in-out z-20 md:relative md:translate-x-0 border-r border-zinc-800`}>
        <div className="p-4 h-full flex flex-col">
          <Button
            onClick={startNewChat}
            className="group w-full bg-black hover:bg-zinc-900 text-white font-medium py- px-5 rounded-md transition-all duration-300 mb-4 shadow-lg hover:shadow-xl border-2 border-[#14F195] hover:border-[#9945FF] relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center p">
              <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              New Chat
            </span>
          </Button>
          <div className="flex-grow overflow-y-auto space-y-2">
            {history.map((entry) => (
              <Button
                key={entry.id}
                onClick={() => loadChatHistory(entry)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-left text-zinc-50 font-medium py-2 px-4 rounded-md transition-colors duration-300 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {entry.messages[0].content.slice(0, 20)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Solana Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-3/4 h-3/4 max-w-3xl max-h-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195]   opacity-5 blur-3xl"></div>
            <Image
              src="/solana-logo-black.png"
              alt="Solana Logo"
              layout="fill"
              objectFit="contain"
              className="opacity-50"
            />
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {currentChat.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-3/5 flex items-center space-x-2">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter code to audit"
                className="w-full bg-black bg-opacity-50 text-zinc-50 border border-zinc-800 focus:ring-2 focus:ring-[#14F195] placeholder-zinc-400 resize-none rounded-full py-3 px-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black"
                rows={1}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center h-12 w-12 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#14F195] hover:border-[#9945FF]">
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Send className="h-6 w-6" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 font-medium p-2 rounded-full transition-colors duration-300 shadow-lg">
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}
