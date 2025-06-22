import { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex border-t pt-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your question..."
        className="flex-1 p-3 border rounded-l"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-r">
        Send
      </button>
    </form>
  );
};

export default ChatInput;
