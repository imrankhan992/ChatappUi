import { CircleDotIcon } from 'lucide-react';
import { User } from '../types';

interface ChatHeadingProps {
  user: User;
  isTyping?: boolean;
}

export function ChatHeading({ user, isTyping }: ChatHeadingProps) {
  return (
    <div className="header-user-info">
      <div className="user-avatar">
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="avatar-img"
        />
      </div>
      <div>
        <div className="user-name-container">
          <h2 className="user-name">{user.firstName} {user.lastName}</h2>
          <span><CircleDotIcon size={13} color="white" fill="#06d6a0" /></span>
        </div>
        <p className="user-typing">
          {isTyping && (
            <>
              typing
              <span className="typing-dots">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}


import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import {
  CopyIcon,
  SaveIcon,
  ForwardIcon,
  DeleteIcon,
  FileIcon,
  TimerIcon,
  MoreVertical,
  Download,
} from 'lucide-react';

// Avatar With Name
export function AvatarWithName({
  align,
  senderFirstName,
  senderLastName,
  senderAvatar,
}: {
  align: 'left' | 'right';
  senderFirstName: string;
  senderLastName: string;
  senderAvatar: string;
}) {
  const isRight = align === 'right';
  const avatarUrl = isRight
    ? `https://avatar.iran.liara.run/username?username=A&size=100&background=0D8ABC&color=fff`
    : senderAvatar;

  return (
    <div className="user-avatar_container">
      {isRight ? <span>Admin</span> : null}
      <div className={`${align} user-avatar-right-img`}>
        <img
          src={avatarUrl}
          alt={`${senderFirstName} ${senderLastName}`}
          className="avatar-img"
        />
      </div>
      {!isRight ? <span>{senderFirstName} {senderLastName}</span> : null}
    </div>
  );
}

// Popover Actions
export function MessageActionsPopover() {
  return (
    <Popover className="three_dot">
      <PopoverButton>
        <MoreVertical size={15} />
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="popover-panel">
        <div className="popover-button"><button>Copy</button><CopyIcon size={18} /></div>
        <div className="popover-button"><button>Save</button><SaveIcon size={18} /></div>
        <div className="popover-button"><button>Forward</button><ForwardIcon size={18} /></div>
        <div className="popover-button"><button>Delete</button><DeleteIcon size={18} /></div>
      </PopoverPanel>
    </Popover>
  );
}

// File Message
export function FileMessage({
  files,
  align,
}: {
  files: { name: string; size: string }[];
  align: 'left' | 'right';
}) {
  return (
    <div className={`message-content ${align}`}>
      <div className="message-file-main">
        {files.map((file, index) => (
          <div key={index} className="message-file">
            <div className="file-icon"><FileIcon size={20} /></div>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-size">{file.size}</div>
            </div>
            <div className="file-actions">
              <button className="file-action-button"><Download size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      <MessageActionsPopover />
    </div>
  );
}

// Image Message
export function ImageMessage({
  files,
  align,
}: {
  files: { url: string; name: string }[];
  align: 'left' | 'right';
}) {
  return (
    <div className={`message-content ${align}`}>
      <div className="message-image-main">
        {files.map((file, index) => (
          <div key={index} className="message-image-container">
            <img src={file.url} alt={file.name} className="message-image" />
            <div className="message-image-actions">
              <button className="image-action-button"><Download size={16} /></button>
            </div>
          </div>
        ))}
      </div>
      <MessageActionsPopover />
    </div>
  );
}

// Text Message
export function TextMessage({
  content,
  timestamp,
  align,
}: {
  content: string;
  timestamp: string;
  align: 'left' | 'right';
}) {
  return (
    <div className={`message-content ${align}`}>
      <p className={`message-text ${align}`}>{content}</p>
      <div className="message-footer">
        <div className={`message-footer-${align}`}>
          <TimerIcon size={13} />
          <p className="message-time">{timestamp}</p>
        </div>
      </div>
      <MessageActionsPopover />
    </div>
  );
}

// message input

import { Smile, Paperclip, Image, SendHorizontalIcon } from 'lucide-react';

export const EmojiButton = ({ onClick }: { onClick?: () => void }) => (
  <button type="button" className="input-action-button" onClick={onClick}>
    <Smile size={20} />
  </button>
);

export const ImageUploadButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className="input-action-button" onClick={onClick}>
    <Image size={20} />
  </button>
);

export const FileUploadButton = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className="input-action-button" onClick={onClick}>
    <Paperclip size={20} />
  </button>
);

export const SendMessageButton = ({ disabled }: { disabled: boolean }) => (
  <button type="submit" className="send-button" disabled={disabled}>
    <SendHorizontalIcon size={20} />
  </button>
);

export const MessageTextInput = ({
  value,
  onChange
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type="text"
    placeholder="Enter Message..."
    className="message-input"
    value={value}
    onChange={onChange}
  />
);



// side bar
import {
  Globe,
  Moon,
  Sun,
} from 'lucide-react';
import React from 'react';

export const SidebarNavButton = ({
  icon: Icon,
  isActive,
  onClick,
  hidden,
  title
}: {
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
  hidden?: boolean;
  title: string;
}) => (
  <button
    onClick={onClick}
    className={`nav-button ${hidden ? 'true' : 'false'} ${isActive ? 'active' : ''}`}
    title={title}
  >
    <Icon size={20} />
  </button>
);

export const ThemeToggleButton = ({
  isDark,
  onToggle
}: {
  isDark: boolean;
  onToggle: () => void;
}) => (
  <button
    onClick={onToggle}
    className="nav-button"
    title={isDark ? 'Light Mode' : 'Dark Mode'}
  >
    {isDark ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

export const AvatarIcon = ({ src }: { src: string }) => (
  <div>
    <img
      src={src}
      alt="User avatar"
      className=""
      width={40}
    />
  </div>
);


// user list 



export const UserAvatar = ({
  avatar,
  alt,
  status
}: {
  avatar: string;
  alt: string;
  status: 'online' | 'away' | 'offline';
}) => (
  <div className="user-avatar">
    <img src={avatar} alt={alt} className="avatar-img" />
    <span
      className={`status-indicator ${
        status === 'online'
          ? 'status-online'
          : status === 'away'
          ? 'status-away'
          : 'status-offline'
      }`}
    />
  </div>
);

export const TypingIndicator = () => (
  <div className="user-typing">
    typing
    <div className="typing-dots">
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
  </div>
);

export const UnreadBadge = ({ count }: { count: number }) =>
  count > 0 ? <span className="unread-badge">{count}</span> : null;

export const UserItem = ({
  user,
  isSelected,
  onSelect
}: {
  user: User;
  isSelected: boolean;
  onSelect: (user: User) => void;
}) => (
  <div
    key={user.id}
    className={`user-item ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(user)}
  >
    <UserAvatar
      avatar={user.avatar}
      alt={`${user.firstName} ${user.lastName}`}
      status={user.status}
    />
    <div className="user-info">
      <div className="user-name">
        {user.firstName} {user.lastName}
      </div>
      {user.isTyping ? (
        <TypingIndicator />
      ) : (
        <p className="user-last-message">{user.lastMessage}</p>
      )}
    </div>
    <div className="user-meta">
      <span className="user-timestamp">{user.lastSeen}</span>
      <UnreadBadge count={user.unseenCount} />
    </div>
  </div>
);



// user search
import { Search } from 'lucide-react';

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) => (
  <div className={`search-wrapper ${className}`}>
    <input
      type="text"
      placeholder={placeholder}
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search className="search-icon" size={18} />
  </div>
);