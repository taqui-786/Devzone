"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useUser } from "@/lib/store/user";
import { useMessage } from "@/lib/store/message";
import { createMessage } from "@/lib/supabase/Action";
import { v4 as uuidv4 } from 'uuid';
interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  type: "text" | "pdf" | "image" | "video";
  fileUrl?: string;
}
function SendMessage() {
  const addMessage = useMessage((state) => state.addMessage);
  const currentUser = useUser((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const sendMessage = async (newMessage: string) => {
    if (newMessage.trim()) {
      const newMessageUuid = uuidv4();
      const message: MessageType = {
        id: newMessageUuid, // Use a timestamp as a simple unique ID
        users: { id: currentUser?.id, avatar: currentUser?.avatar,full_name: currentUser?.full_name},
        send_by: currentUser?.id,
        context: newMessage,
        created_at: new Date().toISOString(),
        likes:[],
        
        msg_type: "text",
      };
      
      addMessage(message, currentUser?.id as string);
      const res = await createMessage({
        id:newMessageUuid,
        context: newMessage,
        msg_type: "text",
        send_by: currentUser?.id,
      });
      if(!res?.status) {
        console.log('Failed to send message');
        
      }
    }
  };

  const handleSend = () => {
    sendMessage(newMessage);
    setNewMessage(""); // Clear the input field
  };
  return (
    <div className="p-4 bg-gray-800 shadow-inner">
      <div className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500"
        />
        <Button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default SendMessage;
