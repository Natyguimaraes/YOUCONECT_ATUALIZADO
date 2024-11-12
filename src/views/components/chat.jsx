import React, { useState } from 'react';
import '../styles/chat.css';
import FooterMenu from './FooterMenu';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  return (
    <><div className="chat-container">
          <div className="chat-header">
              <h1>Chat</h1>
          </div>
          <div className="chat-messages">
              {messages.map((message, index) => (
                  <div
                      key={index}
                      className={`chat-message ${message.sender === 'me' ? 'sent' : 'received'}`}
                  >
                      {message.text}
                  </div>
              ))}
          </div>
          <div className="chat-input">
              <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..." />
              <button onClick={handleSendMessage}>Send</button>
          </div>
      </div>
      <FooterMenu /></>
  );
};

export default Chat;