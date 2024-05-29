// ChatFeed.js
import React, { useEffect, useRef } from 'react';
import ChatList from './ChatList'; // Import the ChatList component
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;
  const chat = chats && chats[activeChat];
  const messagesKeys = Object.keys(messages);
  const scrollRef = useRef();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <ChatList
        {...props}
        onChatClick={(chatId) => props.setActiveChat(chatId)}
        activeChat={activeChat}
      />
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {messagesKeys.map((key, index) => {
        const message = messages[key];
        const lastMessageKey = index === 0 ? null : messagesKeys[index - 1];
        const isMyMessage = userName === message.sender.username;

        return (
          <div key={`msg_${index}`} style={{ width: '100%' }}>
            <div className="message-block">
              {isMyMessage ? (
                <MyMessage message={message} />
              ) : (
                <TheirMessage
                  message={message}
                  lastMessage={messages[lastMessageKey]}
                />
              )}
            </div>
            <div
              ref={scrollRef}
              className="read-receipts"
              style={{
                marginRight: isMyMessage ? '18px' : '0px',
                marginLeft: isMyMessage ? '0px' : '68px',
              }}
            />
          </div>
        );
      })}
    <MessageForm {...props} chatId={activeChat} creds={{ 
  'Project-ID': 'abab1f88-56f9-4001-9a3b-d6a71a77bc83',
  'User-Name': 'amit',
  'User-Secret': 'abcd',
}} />

    </div>
  );
};

export default ChatFeed;
