import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const { repoName, chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [allChats, setAllChats] = useState([]);

  // Load messages on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('eduChatData') || '{}');
    const repoChats = stored[repoName] || [];

    const selectedChat = repoChats.find((chat) => chat.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }

    setAllChats(repoChats);
  }, [repoName, chatId]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', text: input },
      { role: 'bot', text: `You said: "${input}"` },
    ];

    setMessages(newMessages);
    updateLocalStorage(newMessages);
    setInput('');
  };

  const updateLocalStorage = (newMessages) => {
    const stored = JSON.parse(localStorage.getItem('eduChatData') || '{}');
    const repoChats = stored[repoName] || [];

    const updatedChats = repoChats.map((chat) =>
      chat.id === chatId ? { ...chat, messages: newMessages } : chat
    );

    stored[repoName] = updatedChats;
    localStorage.setItem('eduChatData', JSON.stringify(stored));
  };

  const handleNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      messages: [
        { role: 'user', text: `Started a new chat in ${repoName}` },
      ],
    };

    const stored = JSON.parse(localStorage.getItem('eduChatData') || '{}');
    const repoChats = stored[repoName] || [];
    stored[repoName] = [newChat, ...repoChats];

    localStorage.setItem('eduChatData', JSON.stringify(stored));
    navigate(`/chat/${repoName}/${newChatId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">Chats: {repoName}</h2>

        <div className="flex-1 overflow-y-auto space-y-2">
          {allChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => navigate(`/chat/${repoName}/${chat.id}`)}
              className={`p-2 rounded cursor-pointer ${chat.id === chatId ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
            >
              {chat.messages[0]?.text?.slice(0, 30) || 'New Chat'}
            </div>
          ))}
        </div>

        <button
          onClick={handleNewChat}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          ➕ New Chat
        </button>
        <button
          onClick={() => navigate('/home')}
          className="mt-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
        >
          ← Back to Home
        </button>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col justify-between">
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xl p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 self-end' : 'bg-gray-700 self-start'
                }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="p-4 bg-gray-800">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-l bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r text-white"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
