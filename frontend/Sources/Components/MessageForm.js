// MessageForm.js
import React, { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';
import axios from 'axios';
import './ChatPage.css'
const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;


  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };
    
console.log('chatId:',chatId)
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const text = value.trim();
  
    if (text.length > 0) {
      try {
        const authObject = {
          // 'Project-ID': creds['Project-ID'],
          // 'User-Name': creds['User-Name'],
          // 'User-Secret': creds['User-Secret'],
          'Project-ID':'7c517e68-15b1-4618-957d-7a92823354f9' ,
          'User-Name':'TradeAndTroves',
          'User-Secret': 'abcd',
        };
        console.log(creds['User-Name'],creds['User-Secret'],)
        const messageData = {
          text: text,
        };
  
        const chatID = '222177';
  
        await axios.post(`https://api.chatengine.io/chats/${chatID}/messages/`, messageData, { headers: authObject });
  
        setValue(''); // Clear the input after sending the message
  
        // Introduce a delay before allowing the next submission
        setTimeout(() => {
          // Code to be executed after the delay (e.g., enable a button)
          // For example, you might want to enable a button or perform other actions here
        }, 1000); // 1000 milliseconds (adjust as needed)
      } catch (error) {
        // Handle message sending error
        console.error('Message sending error:', error);
      }
    }
  };
  

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
