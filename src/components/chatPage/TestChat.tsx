"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Send, Code, Terminal, Heart, MessageSquare, Share, FileText, Image, Video } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, isToday, isYesterday } from 'date-fns'

import ClockWithPhoto from './widgets/ClockWidget'
import Profile from './widgets/ProfileWidget'
import { UserActivityWidget } from './widgets/RightSideWidget'

interface Message {
  id: number
  sender: string
  content: string
  timestamp: Date
  likes: number
  isLiked: boolean
  type: 'text' | 'pdf' | 'image' | 'video'
  fileUrl?: string
}

export default function CodeChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Alice', content: 'Hey everyone! Any tips on optimizing React performance?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), likes: 2, isLiked: false, type: 'text' },
    { id: 2, sender: 'You', content: 'Have you tried using React.memo for pure components?', timestamp: new Date(Date.now() - 1000 * 60 * 30), likes: 1, isLiked: false, type: 'text' },
    { id: 3, sender: 'Charlie', content: 'Don\'t forget about useMemo and useCallback hooks!', timestamp: new Date(Date.now() - 1000 * 60 * 15), likes: 3, isLiked: true, type: 'text' },
    { id: 4, sender: 'You', content: 'Great suggestions! I\'ll give them a try.', timestamp: new Date(Date.now() - 1000 * 60 * 5), likes: 0, isLiked: false, type: 'text' },
    { id: 5, sender: 'Bob', content: 'React_Performance_Guide.pdf', timestamp: new Date(), likes: 1, isLiked: false, type: 'pdf', fileUrl: '/placeholder.svg?height=100&width=100' },
    { id: 6, sender: 'Alice', content: 'Here\'s a diagram of React lifecycle', timestamp: new Date(), likes: 2, isLiked: false, type: 'image', fileUrl: '/placeholder.svg?height=200&width=300' },
    { id: 7, sender: 'Charlie', content: 'Check out this video on React optimization', timestamp: new Date(), likes: 0, isLiked: false, type: 'video', fileUrl: '/placeholder.svg?height=150&width=250' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: messages.length + 1, 
        sender: 'You', 
        content: newMessage,
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
        type: 'text'
      }])
      setNewMessage('')
    }
  }

 
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Widget Area */}
      <div className="w-1/4 p-4 space-y-4 hidden lg:block">
        <Card className="bg-gray-800 shadow-lg p-4 h-1/2 border-0">
          <Profile />
        </Card>
        <Card className="bg-gray-800 shadow-lg p-4 h-1/2 border-0">
          <ClockWithPhoto/>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">CodeChat</h1>
          </div>
          <Button variant="outline" size="icon" className="text-purple-400 border-gray-600 hover:bg-gray-700 hover:text-purple-300">
            <Code className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`mb-6 flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'} max-w-[80%]`}>
                  <div className={`flex items-center mb-1 ${message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {message.sender !== 'You' && (
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <span className={`text-sm font-semibold ${message.sender === 'You' ? 'text-purple-300 ml-2' : 'text-blue-300 mr-2'}`}>
                      {message.sender}
                    </span>
                    <span className="text-xs text-gray-400">{formatMessageTime(message.timestamp)}</span>
                  </div>
                  <div className={`rounded-lg p-3 shadow relative overflow-hidden ${
                    message.sender === 'You' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"></div>
                    {renderMessageContent(message)}
                  </div>
                  <div className={`flex items-center mt-2 space-x-2 ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className={`focus:outline-none ${message.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                            onClick={() => handleLike(message.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className="h-5 w-5" fill={message.isLiked ? 'currentColor' : 'none'} />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{message.isLiked ? 'Unlike' : 'Like'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {message.likes > 0 && (
                      <span className="text-xs text-gray-400 mr-2">{message.likes}</span>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className="text-gray-400 hover:text-blue-400 focus:outline-none"
                            onClick={() => handleReply(message.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <MessageSquare className="h-5 w-5" />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Reply</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            className="text-gray-400 hover:text-green-400 focus:outline-none"
                            onClick={() => handleShare(message.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Share className="h-5 w-5" />
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
        <div className="p-4 bg-gray-800 shadow-inner">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
            />
            <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Widget Area */}
      <div className="w-1/4 p-4 space-y-4 hidden lg:block">
        <UserActivityWidget/>
      </div>
    </div>
  )
}