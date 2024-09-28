type UserType = {
  id?: string;
  full_name?: string | null;
  google_name?: string | null;
  email?: string | null;
  created_at?: string | null;
  avatar?: string | null;
};

type MessageType = {
  id?: string;
  context?: string;
  send_by?: string;
  sender?: UserType;
  is_edited?: boolean;
  msg_type?: "text" | "pdf" | "image" | "video";
  created_at?: string;
  users?: UserType;
  likes?:MessageLikeType[];
};
type MessageLikeType = {
  id?: string;
  message_id?: string;
  user_id?: string;
  created_at?: string;
};
interface MessageOrganisedType {
  id: string;
  sender: UserType;
  content: string;
  timestamp?: Date | number;
  likes: MessageLikeType[];
  isLiked: boolean;
  type: "text" | "pdf" | "image" | "video";
  fileUrl?: string;

}