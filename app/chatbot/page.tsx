"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
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
  Upload,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuditRequest } from "../hooks/useAuditRequest";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  displayContent?: React.ReactNode;
}

interface AuditEntry {
  id: string;
  messages: ChatMessage[];
  timestamp: Date;
}

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isPushed, setIsPushed] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setIsPushed(index);
    setTimeout(() => {
      setCopiedIndex(null);
      setIsPushed(null);
    }, 500);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/```([\s\S]*?)```/);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const [language, ...codeLines] = part.split("\n");
        const code = codeLines.join("\n").trim();
        return (
          <div key={index} className="relative w-full my-4">
            <SyntaxHighlighter
              language={language || "text"}
              style={vscDarkPlus}
              className="rounded-md !my-0 !bg-zinc-800"
              customStyle={{
                padding: "1rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
              }}>
              {code}
            </SyntaxHighlighter>
            <button
              onClick={() => handleCopy(code, index)}
              className={`absolute top-2 right-2 p-1 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-all duration-200 ${
                isPushed === index ? "scale-90" : "scale-100"
              }`}>
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 text-zinc-300" />
              )}
            </button>
          </div>
        );
      } else {
        // This is regular text
        return (
          <ReactMarkdown
            key={index}
            className="prose prose-invert prose-sm max-w-none text-zinc-300 leading-relaxed"
            components={{
              p: ({ node, ...props }) => (
                <p className="mb-4 last:mb-0" {...props} />
              ),
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-bold mb-4 mt-6 text-zinc-100"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-bold mb-3 mt-5 text-zinc-200"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg font-bold mb-2 mt-4 text-zinc-200"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc list-inside mb-4 space-y-2"
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal list-inside mb-4 space-y-2"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-[#14F195] pl-4 italic my-4 text-zinc-400"
                  {...props}
                />
              ),
              code: ({
                inline,
                className,
                ...props
              }: ComponentPropsWithoutRef<"code"> & { inline?: boolean }) =>
                inline ? (
                  <code
                    className={`bg-zinc-800 rounded px-1 py-0.5 text-sm text-zinc-200 ${className}`}
                    {...props}
                  />
                ) : (
                  <code {...props} />
                ),
            }}>
            {part}
          </ReactMarkdown>
        );
      }
    });
  };

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-6`}>
      <div
        className={`flex ${
          message.role === "user" ? "flex-row-reverse" : "flex-row"
        } items-start max-w-[85%] space-x-2`}>
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
          <div className="p-4 text-sm">
            {typeof message.displayContent === "string"
              ? renderContent(message.displayContent)
              : message.displayContent || renderContent(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};

const TypingAnimation: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg p-4 max-w-[80%]">
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <Bot className="h-5 w-5 text-[#9945FF]" />
      </div>
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-[#9945FF] rounded-full"
            animate={{
              y: ["0%", "-50%", "0%"],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add this new component
const FileIndicator: React.FC<{ fileName: string }> = ({ fileName }) => (
  <div className="bg-[#14F195] bg-opacity-20 text-[#14F195] rounded-md px-2 py-1 text-xs flex items-center space-x-1 mb-2">
    <Upload className="h-3 w-3" />
    <span className="font-medium">[File: {fileName}]</span>
  </div>
);

// Add this new component for the input file indicator
const InputFileIndicator: React.FC<{ fileName: string }> = ({ fileName }) => (
  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[#14F195] bg-opacity-20 text-[#14F195] rounded-full px-2 py-0.5 text-xs flex items-center space-x-1">
    <Upload className="h-3 w-3" />
    <span className="font-medium truncate max-w-[150px]">{fileName}</span>
  </div>
);

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([]);
  const [history, setHistory] = useState<AuditEntry[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { result, isLoading, error, requestAudit } = useAuditRequest();
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [currentChat]);

  const examplePrompts = [
    "Explain reentrancy vulnerabilities in Solana",
    "How to prevent integer overflow in Solana programs?",
    "What are common account confusion attacks in Solana?",
    "Mitigating signer authorization vulnerabilities in Solana",
  ];

  const handleExamplePrompt = async (prompt: string) => {
    setInput(prompt);
    await handleSubmit(
      new Event("submit") as unknown as React.FormEvent,
      prompt
    );
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setUploadedFile(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent, overrideInput?: string) => {
    e.preventDefault();
    const submittedInput = overrideInput || input;
    if (!submittedInput.trim() && !uploadedFile) return;

    let messageContent = submittedInput;
    let displayContent = (
      <>
        {uploadedFileName && <FileIndicator fileName={uploadedFileName} />}
        <div>{submittedInput}</div>
      </>
    );

    if (uploadedFile) {
      messageContent += `\n\n\`\`\`rust\n${uploadedFile}\n\`\`\``;
    }

    const newMessage: ChatMessage = {
      role: "user",
      content: messageContent,
      displayContent: displayContent,
    };

    setCurrentChat((prev) => [...prev, newMessage]);
    setIsTyping(true);

    setInput("");
    setUploadedFile(null);
    setUploadedFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const response = await requestAudit(messageContent);
      console.log("Response received:", response);
      if (response && response.message) {
        const assistantMessage: ChatMessage = {
          role: "assistant",
          content: response.message,
        };
        setCurrentChat((prev) => {
          const updatedChat = [...prev, assistantMessage];
          console.log("Updated chat:", updatedChat);
          return updatedChat;
        });

        setHistory((prev) => {
          const newEntry: AuditEntry = {
            id: Date.now().toString(),
            messages: [
              ...(prev[0]?.messages || []),
              newMessage,
              assistantMessage,
            ],
            timestamp: new Date(),
          };
          return [newEntry, ...prev];
        });
      }
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "An error occurred while processing your request.",
      };
      setCurrentChat((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

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
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-black to-zinc-900 text-zinc-50 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-zinc-950 transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 border-r border-zinc-800`}>
        <div className="p-4 h-full flex flex-col">
          <Button
            onClick={startNewChat}
            className="group w-full bg-black hover:bg-zinc-900 text-white font-medium py-2 px-4 rounded-md transition-all duration-300 mb-4 shadow-lg hover:shadow-xl border-2 border-[#14F195] hover:border-[#9945FF] relative overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-[#14F195] to-[#9945FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative flex items-center justify-center">
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
            <div className="absolute inset-0 bg-gradient-to-br from-[#9945FF] to-[#14F195] opacity-5 blur-3xl"></div>
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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
          {currentChat.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          {isTyping && <TypingAnimation />}
          <div ref={messagesEndRef} />
        </div>

        {/* Example Prompts */}
        {currentChat.length === 0 && (
          <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  onClick={() => handleExamplePrompt(prompt)}
                  className="bg-black text-white text-xs font-medium rounded-full px-3 py-1 transition-all duration-300 shadow-md hover:shadow-lg border border-[#14F195] hover:border-[#9945FF]">
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <form
            onSubmit={handleSubmit}
            className="mx-auto w-full md:w-4/5 lg:w-3/5 flex flex-col items-center space-y-2">
            <div className="w-full flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
              {uploadedFileName && (
                <div className="w-full md:w-auto order-2 md:order-1">
                  <FileIndicator fileName={uploadedFileName} />
                </div>
              )}
              <div className="w-full md:flex-1 relative order-1 md:order-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about the solana 🚀"
                  className="w-full bg-black bg-opacity-50 text-zinc-50 border border-zinc-800 focus:ring-2 focus:ring-[#14F195] placeholder-zinc-400 resize-none rounded-full py-3 md:py-5 pb-2 md:pb-4 pt-2 md:pt-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-black pl-4 pr-12"
                  rows={1}
                />
              </div>
              <div className="flex space-x-2 order-3">
                <input
                  type="file"
                  accept=".rs"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-black text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center h-12 w-12 shadow-md hover:shadow-lg border-2 border-[#14F195] hover:border-[#9945FF]">
                  <Upload className="h-6 w-6" />
                  <span className="sr-only">Upload Rust File</span>
                </Button>
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
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 font-medium p-3 rounded-full transition-colors duration-300 shadow-lg">
        {isSidebarOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <Menu className="h-7 w-7" />
        )}
      </Button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
