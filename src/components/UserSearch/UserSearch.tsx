import "./usersearch.css";
import { SearchInput } from '../branding';

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return (
    <div className="search-container">
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder="Search messages or users"
      />
    </div>
  );
}
