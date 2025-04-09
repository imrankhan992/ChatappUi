import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Message } from '../types';
import { CopyIcon, DeleteIcon, Download, FileIcon, ForwardIcon, MoreVertical, SaveIcon, TimerIcon } from 'lucide-react';
import { useState } from 'react';
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
  fileUrl,
  fileName,
  fileSize,
  files,
  senderFirstName,
  senderLastName,
  senderAvatar,
}: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowActions(!showActions);
  };

  if (type === 'file' && files && files.length > 0) {
    return (
      <div className={`message-bubble ${align}`}>
        <div className={`message-content ${align}`}>
        <div className='message-file-main'>
        {files.map((file, index) => (
            <div key={index} className="message-file">
              <div className="file-icon">
                <FileIcon size={20} />
              </div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{file.size}</div>
              </div>
              <div className="file-actions">
                <button className="file-action-button">
                  <Download size={16} />
                </button>
              
              </div>
            </div>
          ))}
        </div>
           <Popover className="three_dot">
      <PopoverButton><MoreVertical size={15}/></PopoverButton>
      <PopoverPanel anchor="bottom" className="popover-panel">
        <div className='popover-button'><button>Copy</button> <CopyIcon size={18}/></div>
        <div className='popover-button'><button>Save</button> <SaveIcon size={18}/></div>
        <div className='popover-button'><button>Forward</button> <ForwardIcon size={18}/></div>
        <div className='popover-button'><button>Delete</button> <DeleteIcon size={18}/></div>
      </PopoverPanel>
    </Popover>
        </div>
        {
        align === 'right' && (
         <div className='user-avatar_container'>
            <span>Admin</span>
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={`https://avatar.iran.liara.run/username?username=A&size=100&background=0D8ABC&color=fff`}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
       
        </div>
       
         </div>
        )
      }
       {
        align === 'left' && (
          <div className='user-avatar_container'>
           
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={senderAvatar}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
      
        </div>
        <span>{senderFirstName} {senderLastName}</span>
         </div>
        )
      }
      </div>
    );
  }

  if (type === 'image' && files && files.length > 0) {
    return (
      <div className={`message-bubble ${align}`}>
        <div className={`message-content ${align}`}>
         <div className='message-image-main'>
         {files.map((file, index) => (
            <div key={index} className="message-image-container">
              <img src={file.url} alt={file.name} className="message-image" />
              <div className="message-image-actions">
                <button className="image-action-button">
                  <Download size={16} />
                </button>
               
              </div>
            </div>
          ))}
         </div>
          <Popover className="three_dot">
      <PopoverButton><MoreVertical size={15}/></PopoverButton>
      <PopoverPanel anchor="bottom" className="popover-panel">
        <div className='popover-button'><button>Copy</button> <CopyIcon size={18}/></div>
        <div className='popover-button'><button>Save</button> <SaveIcon size={18}/></div>
        <div className='popover-button'><button>Forward</button> <ForwardIcon size={18}/></div>
        <div className='popover-button'><button>Delete</button> <DeleteIcon size={18}/></div>
      </PopoverPanel>
    </Popover>
        </div>
        {
        align === 'right' && (
         <div className='user-avatar_container'>
            <span>Admin</span>
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={`https://avatar.iran.liara.run/username?username=A&size=100&background=0D8ABC&color=fff`}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
       
        </div>
       
         </div>
        )
      }
       {
        align === 'left' && (
          <div className='user-avatar_container'>
           
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={senderAvatar}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
      
        </div>
        <span>{senderFirstName} {senderLastName}</span>
         </div>
        )
      }
      </div>
    );
  }

  return (
    <div className={`message-bubble ${align}`}>
    
     <div className={`message-content ${align}`}>
        <p className={`message-text ${align}`}>{content}</p>
        <div className="message-footer">
         <div className={`message-footer-${align}`}>
         <TimerIcon size={13}/>
         <p className="message-time">{timestamp}</p>
         
         </div>
         
        </div>
          {/* three dot */}
      {/* three dot */}
      <Popover className="three_dot">
      <PopoverButton><MoreVertical size={15}/></PopoverButton>
      <PopoverPanel anchor="bottom" className="popover-panel">
        <div className='popover-button'><button>Copy</button> <CopyIcon size={18}/></div>
        <div className='popover-button'><button>Save</button> <SaveIcon size={18}/></div>
        <div className='popover-button'><button>Forward</button> <ForwardIcon size={18}/></div>
        <div className='popover-button'><button>Delete</button> <DeleteIcon size={18}/></div>
      </PopoverPanel>
    </Popover>
      </div>
      {
        align === 'right' && (
         <div className='user-avatar_container'>
            <span>Admin</span>
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={`https://avatar.iran.liara.run/username?username=A&size=100&background=0D8ABC&color=fff`}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
       
        </div>
       
         </div>
        )
      }
       {
        align === 'left' && (
          <div className='user-avatar_container'>
           
           <div className={`${align} user-avatar-right-img`}>
          <img
            src={senderAvatar}
            alt={`${senderLastName} ${senderLastName}`}
            className="avatar-img"
          />
      
        </div>
        <span>{senderFirstName} {senderLastName}</span>
         </div>
        )
      }
     </div>
 
  );
}