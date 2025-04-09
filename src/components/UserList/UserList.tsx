import { User } from '../types';
import {
  UserItem
} from '../branding';
import './userlist.css';

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
          <UserItem
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onSelect={onUserSelect}
          />
        ))}
      </div>
    </div>
  );
}
