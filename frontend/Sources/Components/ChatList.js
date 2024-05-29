// ChatList.js
import React from 'react';

const ChatList = ({ chats, activeChat, onChatClick }) => {
  return (
    <div className="chat-list-container">
      <div className="chat-list-title">Recent Chats</div>
      <div className="chat-list">
        {chats && Object.keys(chats).map((chatId) => {
          const chat = chats[chatId];
          const isActive = chatId === activeChat;

          return (
            <div
              key={chatId}
              onClick={() => onChatClick(chatId)}
              className={`chat-list-item ${isActive ? 'active' : ''}`}
            >
              {chat.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
