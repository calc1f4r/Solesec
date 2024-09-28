'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Plus, Menu, X, Send, User, Bot } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AuditEntry {
  id: string;
  messages: ChatMessage[];
  timestamp: Date;
}

const MessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => (
  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start max-w-[80%]`}>
      <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
        {message.role === 'user' ? (
          <div className="bg-gradient-to-br from-[#14F195] to-[#9945FF] rounded-full p-2 shadow-lg">
            <User className="h-5 w-5 text-white" />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#9945FF] to-[#14F195] rounded-full p-2 shadow-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
        )}
      </div>
      <Card className={`${message.role === 'user' ? 'bg-zinc-800' : 'bg-zinc-900'} border-none rounded-lg shadow-md`}>
        <CardContent className="p-3">
          <ReactMarkdown
            className="prose prose-invert prose-sm max-w-none"
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </CardContent>
      </Card>
    </div>
  </div>
)

export function ChatInterface() {
  const [input, setInput] = useState('')
  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState<AuditEntry[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [currentChat])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessage: ChatMessage = { role: 'user', content: input }
    setCurrentChat(prev => [...prev, newMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: input }),
      })
      const data = await response.json()
      const assistantMessage: ChatMessage = { role: 'assistant', content: data.result }
      setCurrentChat(prev => [...prev, assistantMessage])

      const newEntry: AuditEntry = {
        id: Date.now().toString(),
        messages: [newMessage, assistantMessage],
        timestamp: new Date(),
      }
      setHistory(prev => [newEntry, ...prev])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ChatMessage = { role: 'assistant', content: 'An error occurred while processing your request.' }
      setCurrentChat(prev => [...prev, errorMessage])
    }
    setIsLoading(false)
  }

  const startNewChat = () => {
    setCurrentChat([])
  }

  const loadChatHistory = (entry: AuditEntry) => {
    setCurrentChat(entry.messages)
    setIsSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-zinc-900 text-zinc-50 font-sans">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-zinc-950 transition-transform duration-300 ease-in-out z-20 md:relative md:translate-x-0 border-r border-zinc-800`}>
        <div className="p-4 h-full flex flex-col">
          <Button onClick={startNewChat} className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#14F195] hover:to-[#9945FF] text-white font-medium py-2 px-4 rounded-md transition-all duration-300 mb-4 shadow-lg hover:shadow-xl">
            <Plus className="mr-2 h-5 w-5" />
            New Chat
          </Button>
          <div className="flex-grow overflow-y-auto space-y-2">
            {history.map((entry) => (
              <Button
                key={entry.id}
                onClick={() => loadChatHistory(entry)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-left text-zinc-50 font-medium py-2 px-4 rounded-md transition-colors duration-300 overflow-hidden overflow-ellipsis whitespace-nowrap"
              >
                {entry.messages[0].content.slice(0, 20)}...
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter code to audit (Rust, JavaScript, TypeScript, Python, or Solana)..."
                className="w-full bg-zinc-900 text-zinc-50 border-none focus:ring-2 focus:ring-[#14F195] placeholder-zinc-400 resize-none rounded-md pr-12 overflow-hidden"
                rows={3}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#14F195] hover:to-[#9945FF] text-white font-medium rounded-md transition-all duration-300 flex items-center justify-center h-8 w-8 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 font-medium p-2 rounded-full transition-colors duration-300 shadow-lg"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
    </div>
  )
}