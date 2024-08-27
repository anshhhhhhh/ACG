import React, { useState } from 'react';
import Message from './Message';
import InputArea from './InputArea';
import './Chatbot.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const Chatbot = () => {

  const [messages, setMessages] = useState([]);

  async function run(message) {
    try {
      const prompt = message

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
    

      setMessages(prevMessages => [
        ...prevMessages,
        { text, type: 'bot' },
      ]);
    } catch (error) {
      console.error(':( ::', error);
    }
  }

  const handleSendMessage = (message) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { text: message, type: 'user' }
    ]);

    run(message);
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

