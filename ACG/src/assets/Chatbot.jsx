import React, { useState } from 'react';
import Message from './Message';
import InputArea from './InputArea';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, type: 'user' }]);
    
    setTimeout(() => {
      setMessages([...messages, { text: message, type: 'user' }, { text: `Echo: ${message}`, type: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} type={msg.type} />
        ))}
      </div>
      <InputArea onSend={handleSendMessage} />
    </div>
  );
};

export default Chatbot;
