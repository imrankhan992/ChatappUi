import { useState, useRef, useEffect } from 'react';
import { Smile, Paperclip, Send, Image, SendHorizontalIcon } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'image' | 'file', files?: File[]) => void;
  onFileUpload: (files: File[]) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

export function MessageInput({ onSendMessage, onFileUpload, onTyping, onStopTyping }: MessageInputProps) {
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
        <input
          type="text"
          placeholder="Enter Message..."
          className="message-input"
          value={message}
          onChange={handleTyping}
        />
         <button type="button" className="input-action-button">
          <Smile size={20} />
        </button>
        <button
          type="button"
          className="input-action-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
        <button
          type="button"
          className="input-action-button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip size={20} />
        </button>
        <button type="submit" className="send-button" disabled={!message.trim()}>
          <SendHorizontalIcon size={20} />
        </button>
      </div>
    </form>
  );
}