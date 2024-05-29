// ChatPage.js
import React, { useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { useNavigate } from 'react-router-dom';
import ChatFeed from './ChatFeed';

const projectID = '7c517e68-15b1-4618-957d-7a92823354f9'; // Replace with your actual ChatEngine.io Project ID

const ChatPage = () => {
  const navigate = useNavigate();
   console.log(localStorage)
  // Check if the user is authenticated

  if (!localStorage.getItem('username')) {
    navigate('/LoginForm'); // Redirect to the login page if the username is not present
    return null;
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
		
    />
  );
};

export default ChatPage;
