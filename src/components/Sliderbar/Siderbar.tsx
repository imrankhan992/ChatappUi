import { useState } from 'react';
import {
  MessageSquareMore,
  Users,
  Settings,
  Speech,
  Globe2,
  UserRound,
} from 'lucide-react';
import {
  SidebarNavButton,
  ThemeToggleButton,
  AvatarIcon
} from '../branding';
import "./sidebar.css";

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
  onThemeToggle: () => void;
}

export function Sidebar({ activePage, onPageChange, onThemeToggle }: SidebarProps) {
  const [isDark, setIsDark] = useState(false);

  const navItems = [
    { id: 'profile', icon: UserRound, label: 'Profile', hide: false },
    { id: 'chats', icon: MessageSquareMore, label: 'Chats', hide: false },
    { id: 'groups', icon: Users, label: 'Groups', hide: false },
    { id: 'contacts', icon: Speech, label: 'Contacts', hide: true },
    { id: 'settings', icon: Settings, label: 'Settings', hide: false },
    { id: 'globe', icon: Globe2, label: 'Language', hide: true }
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

      {/* Middle - Main navigation icons */}
      <div className="sidebar-middle">
        <ul className="nav-list">
          {navItems.slice(0, 5).map((item) => (
            <li key={item.id} className="nav-item">
              <SidebarNavButton
                icon={item.icon}
                isActive={activePage === item.id}
                onClick={() => onPageChange(item.id)}
                hidden={item.hide}
                title={item.label}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom - Settings, Theme Toggle, Avatar */}
      <div className="sidebar-bottom">
        <ul className="nav-list">
          <li className="nav-item">
            <SidebarNavButton
              icon={Globe2}
              isActive={activePage === 'globe'}
              onClick={() => onPageChange('globe')}
              hidden={true}
              title="Globe"
            />
          </li>
          <li className="nav-item">
            <ThemeToggleButton isDark={isDark} onToggle={handleThemeToggle} />
          </li>
          <li className="nav-item">
            <AvatarIcon src="https://avatar.iran.liara.run/username?username=A" />
          </li>
        </ul>
      </div>
    </div>
  );
}
