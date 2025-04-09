import {
  Phone,
  Video,
  Search,
  ChevronLeft,
  CopyIcon,
  SaveIcon,
  ForwardIcon,
  DeleteIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { User } from '../types';

import './chatheader.css';
import { ChatHeading } from '../branding';

interface ChatHeaderProps {
  user: User;
  onBack: () => void;
  isTyping?: boolean;
}

export function ChatHeader({ user, onBack, isTyping }: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <div className="header-user-info">
        <button className="header-button mobile-only" onClick={onBack}>
          <ChevronLeft size={20} />
        </button>
        <ChatHeading user={user} isTyping={isTyping} />
      </div>

      <div className="header-actions">
        <button className="header-button">
          <Search size={20} />
        </button>
        <button className="header-button hide-in-mobile">
          <Phone size={20} />
        </button>
        <button className="header-button hide-in-mobile">
          <Video size={20} />
        </button>
        <Popover className="header-button">
          <PopoverButton className="header_three_Dot header-button">
            <MoreHorizontalIcon size={20} />
          </PopoverButton>
          <PopoverPanel anchor="bottom" className="popover-panel">
            <div className="popover-button">
              <button>Copy</button> <CopyIcon size={18} />
            </div>
            <div className="popover-button">
              <button>Save</button> <SaveIcon size={18} />
            </div>
            <div className="popover-button">
              <button>Forward</button> <ForwardIcon size={18} />
            </div>
            <div className="popover-button">
              <button>Delete</button> <DeleteIcon size={18} />
            </div>
          </PopoverPanel>
        </Popover>
      </div>
    </div>
  );
}
