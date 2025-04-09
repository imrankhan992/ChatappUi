import { ArrowLeft } from 'lucide-react';

interface BlankPageProps {
  onBack: () => void;
}

export function BlankPage({ onBack }: BlankPageProps) {
  return (
    <div className="blank-page">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back to Chats</span>
      </button>
      <div className="blank-content">
        <h1>Coming Soon</h1>
        <p>This feature is under development</p>
      </div>
    </div>
  );
}