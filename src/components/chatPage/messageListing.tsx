"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMessage } from "@/lib/store/message";
import { useUser } from "@/lib/store/user";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ArrowDown, CornerDownRight, FileText, Heart, MessageSquare, Share } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { supabaseClient } from "@/lib/supabase/supabaseClient";

const formatMessageTime = (date: Date) => {
  if (isToday(date)) return format(date, "h:mm a");
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d");
};

const MessageContent: React.FC<{ message: MessageOrganisedType }> = ({
  message,
}) => {
  switch (message.type) {
    case "pdf":
      return (
        <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
          <FileText className="h-6 w-6 text-red-400" />
          <span>{message.content}</span>
        </div>
      );
    case "image":
      return (
        <img
          src={message.fileUrl}
          alt={message.content}
          className="max-w-full h-auto rounded"
        />
      );
    case "video":
      return (
        <video
          src={message.fileUrl}
          controls
          className="max-w-full h-auto rounded"
        >
          Your browser does not support the video tag.
        </video>
      );
    default:
      return <p className="text-sm relative z-10">{message.content}</p>;
  }
};

const ActionButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}> = ({ icon, label, onClick, isActive }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          className={`focus:outline-none ${
            isActive ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
          onClick={onClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

function ListMessages() {
  const { messages, addMessage, likeMessage, dislikeMessage } = useMessage();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUserId = useUser((state) => state.user?.id);
  const [userScrolled, setUserScrolled] = useState(false);
  const [notifications, setNotifications] = useState<number>(0);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      setNotifications(0);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current && !userScrolled) {
      scrollToBottom();
    }
  }, [messages, userScrolled, scrollToBottom]);

  useEffect(() => {
    const messageSubscription = supabaseClient
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (payload.new.send_by !== currentUserId) {
            const { data, error } = await supabaseClient
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();

            if (!error && data) {
              const newMessage = { ...payload.new, sender: data };

              addMessage(newMessage as MessageType, currentUserId as string);

              const scrollContainer = scrollAreaRef.current;
              if (
                scrollContainer &&
                scrollContainer.scrollTop <
                  scrollContainer.scrollHeight -
                    scrollContainer.clientHeight -
                    10
              ) {
                setNotifications((prev) => prev + 1);
              }
            }
          }
        }
      )
      .subscribe();

    const likeSubscription = supabaseClient
      .channel("likes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "likes" },
        (payload) => {
          console.log(payload);
          if (payload?.new?.user_id !== currentUserId) {
            likeMessage(
              payload?.new?.message_id,
              payload?.new?.user_id,
              payload?.new?.id
            );
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "likes" },
        (payload) => {
          dislikeMessage(payload?.old?.id);
        }
      )
      .subscribe();

    return () => {
      messageSubscription.unsubscribe();
      likeSubscription.unsubscribe();
    };
  }, [currentUserId, addMessage, messages, likeMessage]);

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollAreaRef.current;
    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      if (
        scrollContainer.scrollTop ===
        scrollContainer.scrollHeight - scrollContainer.clientHeight
      ) {
        setNotifications(0);
      }
    }
  }, []);

  /// LIKE -----------
  // Handle like/dislike action
  const handleLike = (messageId: string, isLiked: boolean) => {
    likeMessage(messageId, currentUserId as string);
    // Optionally, send this action to the backend to persist the like/dislike
    if (!isLiked) {
      supabaseClient
        .from("likes")
        .insert([{ message_id: messageId, user_id: currentUserId }])
        .then(({ error }) => {
          if (error) console.error("Error liking message:", error);
        });
    } else {
      supabaseClient
        .from("likes")
        .delete()
        .eq("message_id", messageId)
        .eq("user_id", currentUserId)
        .then(({ error }) => {
          if (error) console.error("Error liking message:", error);
        });
    }
  };





  return (
    <div
      className="flex flex-col overflow-y-auto flex-1 p-2 h-full"
      ref={scrollAreaRef}
      onScroll={handleScroll}
    >
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`mb-6 flex ${
              message.sender?.id === currentUserId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col ${
                message.sender?.id === currentUserId
                  ? "items-end"
                  : "items-start"
              } max-w-[80%]`}
            >
              <div
                className={`flex items-center mb-1 ${
                  message.sender?.id === currentUserId
                    ? "flex-row-reverse"
                    : "flex-row"
                }`}
              >
                {message.sender?.id !== currentUserId && (
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                        message?.sender?.full_name as string
                      )}`}
                      alt="DevZone"
                    />
                    <AvatarFallback>
                      {message.sender?.avatar || "Ti"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <span
                  className={`text-sm font-semibold ${
                    message.sender?.id === currentUserId
                      ? "text-purple-300 ml-2"
                      : "text-blue-300 mr-2"
                  }`}
                >
                  {message.sender?.id === currentUserId
                    ? "You"
                    : message.sender?.full_name}
                </span>
                <span className="text-xs text-gray-400">
                  {formatMessageTime(message?.timestamp as Date)}
                </span>
              </div>
              <div
                className={`rounded-lg p-3 shadow relative overflow-hidden ${
                  message.sender?.id === currentUserId
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10"></div>
                <MessageContent message={message} />
              </div>
              <div
                className={`flex items-center mt-2 space-x-2 ${
                  message.sender?.id === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <ActionButton
                  icon={
                    <Heart
                      className="h-5 w-5"
                      fill={
                        message?.likes?.some(
                          (like) =>
                            like.message_id === message.id &&
                            currentUserId === like.user_id
                        )
                          ? "currentColor"
                          : "none"
                      }
                    />
                  }
                  label={
                    message?.likes?.some(
                      (like) =>
                        like.message_id === message.id &&
                        currentUserId === like.user_id
                    )
                      ? "Unlike"
                      : "Like"
                  }
                  onClick={() =>
                    handleLike(
                      message?.id,
                      message?.likes?.some(
                        (like) =>
                          like.message_id === message.id &&
                          currentUserId === like.user_id
                      )
                    )
                  }
                  isActive={message?.likes?.some(
                    (like) =>
                      like.message_id === message.id &&
                      currentUserId === like.user_id
                  )}
                />

                <span className="text-xs text-gray-400 mr-2">
                  {message?.likes?.length}
                </span>

                <ActionButton
                  icon={<MessageSquare className="h-5 w-5" />}
                  label="Reply"
                  onClick={() => {
                    /* Implement reply functionality */
                  }}
                />
                <ActionButton
                  icon={<Share className="h-5 w-5" />}
                  label="Share"
                  onClick={() => {
                    /* Implement share functionality */
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {userScrolled && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50">
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2"
              onClick={scrollToBottom}
            >
              {notifications > 0 ? (
                <>
                  <span className="text-sm font-semibold">
                    {notifications} new message{notifications > 1 ? "s" : ""}
                  </span>
                  <ArrowDown className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span className="text-sm font-semibold">
                    Scroll to bottom
                  </span>
                  <ArrowDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ListMessages;
