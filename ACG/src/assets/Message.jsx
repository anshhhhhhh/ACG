import React from 'react';
import './Message.css';

const Message = ({ text, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;