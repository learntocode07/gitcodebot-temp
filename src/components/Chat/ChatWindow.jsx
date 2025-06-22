import { useState } from 'react';
import ChatInput from './ChatInput';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = (msg) => {
    setMessages([
      ...messages,
      { text: msg, from: 'user' },
      { text: 'This is a dummy AI response.', from: 'bot' }
    ]);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white">
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg p-3 rounded-lg shadow ${
              msg.from === 'user' ? 'ml-auto bg-blue-100' : 'mr-auto bg-gray-200'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;
