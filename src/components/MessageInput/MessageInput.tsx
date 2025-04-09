import { useState, useRef, useEffect } from 'react';
import "./message_input.css";
import {
  EmojiButton,
  ImageUploadButton,
  FileUploadButton,
  SendMessageButton,
  MessageTextInput
} from '../branding';

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file', files?: File[]) => void;
  onFileUpload: (files: File[]) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export function MessageInput({
  onSendMessage,
  onFileUpload,
  onTyping,
  onStopTyping
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onStopTyping();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping();

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onStopTyping();
    }, 2000);
  };

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <div className="message-input-wrapper">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,application/*"
          className="hidden-file-input"
          multiple
        />
        <MessageTextInput value={message} onChange={handleTyping} />
        <EmojiButton />
        <ImageUploadButton onClick={() => fileInputRef.current?.click()} />
        <FileUploadButton onClick={() => fileInputRef.current?.click()} />
        <SendMessageButton disabled={!message.trim()} />
      </div>
    </form>
  );
}
