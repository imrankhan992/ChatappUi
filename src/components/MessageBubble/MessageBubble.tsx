import {
  AvatarWithName,
  FileMessage,
  ImageMessage,
  TextMessage
} from '../branding';
import { Message } from '../types';
import "./MessageBubble.css";

interface MessageBubbleProps extends Message {
  senderFirstName: string;
  senderLastName: string;
  senderAvatar: string;
}

export function MessageBubble({
  content,
  timestamp,
  align,
  type,
  files,
  senderFirstName,
  senderLastName,
  senderAvatar,
}: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${align}`}>
      {type === 'file' && files ? (
        <FileMessage files={files} align={align} />
      ) : type === 'image' && files ? (
        <ImageMessage files={files} align={align} />
      ) : (
        <TextMessage content={content} timestamp={timestamp} align={align} />
      )}

      <AvatarWithName
        align={align}
        senderFirstName={senderFirstName}
        senderLastName={senderLastName}
        senderAvatar={senderAvatar}
      />
    </div>
  );
}
