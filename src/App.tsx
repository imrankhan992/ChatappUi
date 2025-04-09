import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { UserSearch } from "./components/UserSearch";
import { UserList } from "./components/UserList";
import { ChatHeader } from "./components/ChatHeader";
import { MessageBubble } from "./components/MessageBubble";
import { MessageInput } from "./components/MessageInput";
import { users, pinnedUserIds, userMessages } from "./data/users";
import { User, Message } from "./types";
import { BlankPage } from "./components/BlankPage";

function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePage, setActivePage] = useState("chats");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const pinnedUsers = users.filter((user) => pinnedUserIds.includes(user.id));

  const filteredUsers = users.filter((user) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.nickname?.toLowerCase().includes(searchTerm)
    );
  });

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setShowChat(true);
    const updatedMessages = (userMessages[user.id] || []).map((msg) => ({
      ...msg,
      seen: true,
    }));
    setMessages(updatedMessages);

    const updatedUser = { ...user, unseenCount: 0 };
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
  };

  const handleSendMessage = (
    content: string,
    type: "text" | "image" | "file" = "text",
    files?: File[]
  ) => {
    if (!selectedUser) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      senderId: "current-user",
      align: "right",
      type,
      seen: true,
    };

    if (files && files.length > 0) {
      newMessage.files = files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
    }

    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      setTypingUsers(new Set([selectedUser.id]));

      setTimeout(() => {
        setTypingUsers((prev) => {
          const next = new Set(prev);
          next.delete(selectedUser.id);
          return next;
        });

        const responseMessage: Message = {
          id: Date.now().toString(),
          content: "Thanks for your message!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          senderId: selectedUser.id,
          align: "left",
          type: "text",
          seen: false,
        };

        setMessages((prev) => [...prev, responseMessage]);
      }, 3000);
    }, 1000);
  };

  const handleFileUpload = (files: File[]) => {
    const isImage = files.every((file) => file.type.startsWith("image/"));
    handleSendMessage(
      `${files.length} ${isImage ? "images" : "files"} shared`,
      isImage ? "image" : "file",
      files
    );
  };

  const handleTyping = () => {
    if (!selectedUser) return;
    setTypingUsers((prev) => new Set([...prev, "current-user"]));
  };

  const handleStopTyping = () => {
    setTypingUsers((prev) => {
      const next = new Set(prev);
      next.delete("current-user");
      return next;
    });
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = new Date();
      const dateStr = date.toLocaleDateString();

      if (!groups[dateStr]) {
        groups[dateStr] = [];
      }
      groups[dateStr].push(message);
    });

    return groups;
  };

  if (activePage !== "chats") {
    return <BlankPage onBack={() => setActivePage("chats")} />;
  }

  return (
    <div className={`app ${isDarkMode ? "dark" : ""}`}>
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      <div className="users-section">
        <h3 className="main_heading_user_section">Chats</h3>
        <UserSearch value={searchQuery} onChange={setSearchQuery} />
        <div className="pinned-users">
          <h3 className="users-list-title">Pinned</h3>
          <div className="pinned-users-grid">
            {pinnedUsers.map((user) => (
              <div
                key={user.id}
                className="pinned-user"
                onClick={() => handleUserSelect(user)}
              >
                <div className="pinned-user-avatar">
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="avatar-img"
                  />
                  <span
                    className={`status-indicator ${
                      user.status === "online"
                        ? "status-online"
                        : "status-offline"
                    }`}
                  />
                </div>
                <span className="pinned-user-name">{user.firstName}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="users-list-container">
          <UserList
            users={filteredUsers}
            title="Recent"
            onUserSelect={handleUserSelect}
            selectedUserId={selectedUser?.id}
          />
        </div>
      </div>

      <div className={`chat-section ${showChat ? "active" : ""}`}>
        {selectedUser ? (
          <>
            <ChatHeader
              user={selectedUser}
              onBack={() => setShowChat(false)}
              isTyping={typingUsers.has(selectedUser.id)}
            />
            <div className="messages-container">
              {Object.entries(groupMessagesByDate(messages)).map(
                ([date, dateMessages]) => (
                  <div key={date} className="message_bubble_container">
                    <div className="message-date-divider">
                      {date === new Date().toLocaleDateString()
                        ? "Today"
                        : date}
                    </div>
                    {dateMessages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        {...message}
                        senderFirstName={selectedUser.firstName}
                        senderLastName={selectedUser.lastName}
                        senderAvatar={selectedUser.avatar}
                      />
                    ))}
                  </div>
                )
              )}

              {typingUsers.has(selectedUser.id) && (
                <div className="message-bubble left">
                  <div className="message-content left">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                  <div className="user-avatar_container">
                    <div className={`left user-avatar-right-img`}>
                      <img
                        src={selectedUser.avatar}
                        alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                        className="avatar-img"
                      />
                    </div>
                    <span>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <MessageInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              onTyping={handleTyping}
              onStopTyping={handleStopTyping}
            />
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
