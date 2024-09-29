import { create } from "zustand";

interface MessageState {
  messages: MessageOrganisedType[];
  optimisticId: string[];
  addMessage: (message: MessageType, userId: string) => void;
  setMessages: (storedMessages: any[], userId: string) => void;
  setOptimisticId: (id: string) => void;
  likeMessage: (messageId: string, userId: string, likeId?: string) => void;
  dislikeMessage: (likeId: string) => void;
}

export const useMessage = create<MessageState>()((set) => ({
  messages: [],
  optimisticId: [],

  setOptimisticId: (id) =>
    set((state) => ({
      optimisticId: [...state.optimisticId, id],
    })),

  addMessage: (message, userId) =>
    // @ts-ignore
    set((state) => {
      // Transforming the message before adding

      const transformedMessage = {
        id: message.id,
        sender: message?.users || message?.sender,

        content: message.context,
        timestamp: new Date(message?.created_at as string),
        likes: message?.likes || [],

        type: message.msg_type as "text" | "pdf" | "image" | "video",
        replies: message.replies || [],
      };

      const newMessages = [transformedMessage, ...state.messages];
      return {
        messages: newMessages.sort(
          (a, b) =>
            new Date(a.timestamp as Date).getTime() -
            new Date(b.timestamp as Date).getTime()
        ),
      };
    }),

  // Optional: if you want to set multiple messages at once
  setMessages: (storedMessages, userId) =>
    set(() => ({
      messages: storedMessages
        .map((item) => ({
          id: item.id,
          sender: item?.users,
          content: item.context,
          timestamp: new Date(item.created_at),
          likes: item?.likes || [],

          type: item.msg_type as "text" | "pdf" | "image" | "video",
          // ...(item.msg_type !== "text" ? { fileUrl: "/placeholder.svg" } : {}),
          replies: item.replies || [],
        }))
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        ),
    })),
  // Add a like to a specific message
  likeMessage: (messageId, userId, likeId) =>
    set((state) => {
      return {
        messages: state.messages.map((message) => {
          if (message.id === messageId) {
            const isLiked = message?.likes?.some(
              (like) => like.user_id === userId
            );

            if (isLiked) {
              // Dislike logic (remove the user's like)
              return {
                ...message,
                likes: message?.likes?.filter(
                  (like) => like.user_id !== userId
                ),
              };
            } else {
              // Like logic (add the user's like)
              return {
                ...message,
                likes: [
                  ...message.likes,
                  {
                    id: likeId , // Assuming you want to store when the like was made
                    user_id: userId,
                    message_id: messageId,
                  },
                ],
              };
            }
          }
          return message;
        }),
      };
    }),
  // Dislike function to remove a specific like by likeId
  dislikeMessage: (likeId) =>
    set((state) => {
      return {
        messages: state.messages.map((message) => {
          // Filter out the like by likeId
          const updatedLikes = message.likes.filter(
            (like) => like.id !== likeId
          );

          return {
            ...message,
            likes: updatedLikes,
            isLiked: updatedLikes.length > 0, // Update isLiked based on remaining likes
          };
        }),
      };
    }),
}));
