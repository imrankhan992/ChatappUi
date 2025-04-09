import { MessageSquare, Users, Phone, Settings, Sun, Moon, LogOut, UserRound, MessageSquareMore, Speech, Globe, Globe2 } from 'lucide-react';
import { useState } from 'react';
import "./sidebar.css"
interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  onThemeToggle: () => void;
}

export function Sidebar({ activePage, onPageChange, onThemeToggle }: SidebarProps) {
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { id: 'profile', icon: UserRound, label: 'Profile' , hide:false  },
    { id: 'chats', icon: MessageSquareMore, label: 'Chats' , hide:false  },
    { id: 'groups', icon: Users, label: 'Groups' ,hide:false },
   
    { id: 'contacts', icon: Speech, label: 'Contacts', hide:true  },
    { id: 'settings', icon: Settings, label: 'Settings',hide:false  },
    { id: 'globe', icon: Globe2, label: 'Language',hide:true }
  ];

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    onThemeToggle();
  };

  return (
    <div className="sidebar">
      {/* Top - Logo */}
      <div className="sidebar-logo">
        <div className="logo">C</div>
      </div>

      {/* Middle - Main navigation icons (first 5) */}
      <div className="sidebar-middle">
        <ul className="nav-list">
          {navItems.slice(0, 5).map((item) => (
            <li key={item.id} className="nav-item">
              <button
                onClick={() => onPageChange(item.id)}
                className={`nav-button ${item.hide===true ?"true":"false"} ${activePage === item.id ? 'active' : ''}`}
                title={item.label}
              >
                <item.icon size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom - Settings, Theme Toggle, Logout */}
      <div className="sidebar-bottom">
        <ul className="nav-list">
          <li className="nav-item">
            <button
              onClick={() => onPageChange('globe')}
              className={`nav-button true ${activePage === 'globe' ? 'active' : ''}`}
              title="Globe"

            >
              <Globe size={20} />
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={handleThemeToggle}
              className="nav-button"
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
          <li className="nav-item">
           

            <div className="">
          <img
            src={"https://avatar.iran.liara.run/username?username=A"}
            alt={`https://avatar.iran.liara.run/A=Scott+Wilson`}
            className=""
            width={40}
          />
        
        </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
