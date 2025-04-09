import { Phone, Video, MoreVertical, Search, ArrowLeft, DotIcon, CircleDotIcon, CopyIcon, SaveIcon, ForwardIcon, DeleteIcon, MoreHorizontal, MoreHorizontalIcon, ChevronLeft } from 'lucide-react';
import { User } from '../types';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

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
        <div className="user-avatar">
          <img
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            className="avatar-img"
          />
        
        </div>
        <div>
          <div className='user-name-container'>
          <h2 className="user-name">
            {user.firstName} {user.lastName}
           
          </h2>
          <span className=''><CircleDotIcon size={13} color='white' fill='#06d6a0' /></span>
          </div>
          <p className="user-typing">
            {isTyping ? (
              <>
                typing
                <span className="typing-dots">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </span>
              </>
            ) : (
              ''
            )}
          </p>
        </div>
        {/* <span className="status-indicator status-online" /> */}
       
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
      <PopoverButton className={"header_three_Dot header-button"}><MoreHorizontalIcon size={20}/></PopoverButton>
      <PopoverPanel anchor="bottom" className="popover-panel">
        <div className='popover-button'><button>Copy</button> <CopyIcon size={18}/></div>
        <div className='popover-button'><button>Save</button> <SaveIcon size={18}/></div>
        <div className='popover-button'><button>Forward</button> <ForwardIcon size={18}/></div>
        <div className='popover-button'><button>Delete</button> <DeleteIcon size={18}/></div>
      </PopoverPanel>
    </Popover>
      </div>
    </div>
  );
}