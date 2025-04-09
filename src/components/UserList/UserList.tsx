import { User } from '../types';
import "./userlist.css"
interface UserListProps {
  users: User[];
  title: string;
  onUserSelect: (user: User) => void;
  selectedUserId?: string | null;
}

export function UserList({ users, title, onUserSelect, selectedUserId }: UserListProps) {
  return (
    <div className="users-list">
      <h3 className="users-list-title">{title}</h3>
      <div>
        {users.map((user) => (
          <div 
            key={user.id} 
            className={`user-item ${selectedUserId === user.id ? 'selected' : ''}`}
            onClick={() => onUserSelect(user)}
          >
            <div className="user-avatar">
              <img
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                className="avatar-img"
              />
              <span
                className={`status-indicator ${
                  user.status === 'online'
                    ? 'status-online'
                    : user.status === 'away'
                    ? 'status-away'
                    : 'status-offline'
                }`}
              />
            </div>
            <div className="user-info">
              <div className="user-name">
                {user.firstName} {user.lastName}
              </div>
              {user.isTyping ? (
                <div className="user-typing">
                  typing
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              ) : (
                <p className="user-last-message">{user.lastMessage}</p>
              )}
            </div>
            <div className="user-meta">
              <span className="user-timestamp">{user.lastSeen}</span>
              {user.unseenCount > 0 && (
                <span className="unread-badge">{user.unseenCount}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}