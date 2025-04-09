export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
  isTyping?: boolean;
  unseenCount?: number;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  align: 'left' | 'right';
  backgroundColor?: string;
  color?: string;
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  seen?: boolean;
  files?: { url: string; name: string; size: string }[];
}

export interface ChatState {
  messages: Message[];
  typingStatus: boolean;
}