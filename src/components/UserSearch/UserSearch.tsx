import { Search } from 'lucide-react';
import "./usersearch.css"
interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search messages or users"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Search className="search-icon" size={18} />
      </div>
    </div>
  );
}