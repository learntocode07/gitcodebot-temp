import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // To create unique chat IDs

const Home = () => {
  const navigate = useNavigate();
  const [repoUrl, setRepoUrl] = useState('');

  const extractRepoName = (url) => {
    try {
      const parts = url.split('/');
      return parts[parts.length - 1].replace(/\.git$/, '');
    } catch {
      return 'default';
    }
  };

  const handleStartChat = () => {
    if (!repoUrl.trim()) return;

    const repoName = extractRepoName(repoUrl.trim());
    const chatId = uuidv4();

    // Initialize a new chat instance with first message
    const chats = JSON.parse(localStorage.getItem('eduChatData')) || {};
    if (!chats[repoName]) chats[repoName] = [];

    chats[repoName].push({
      id: chatId,
      messages: [
        {
          role: 'user',
          text: `Chat started for ${repoUrl}`, // First default message
        },
      ],
    });

    localStorage.setItem('eduChatData', JSON.stringify(chats));

    // Navigate to chat page
    navigate(`/chat/${repoName}/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      {/* Center Section */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-xl w-full bg-gray-800 rounded-lg p-8 shadow-lg text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to EduChat</h1>

          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter Git Repository URL"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <button
            onClick={handleStartChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200"
          >
            Start Chat
          </button>
        </div>
      </div>

      {/* Bottom Section (optional recent list) */}
      <div className="bg-gray-800 p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold mb-2">Recent Repositories</h2>
        <ul className="space-y-2 text-gray-300">
          {Object.entries(JSON.parse(localStorage.getItem('eduChatData') || '{}')).map(
            ([repo, chats]) => (
              <li
                key={repo}
                onClick={() => {
                  const latestChat = chats[0];
                  if (latestChat) navigate(`/chat/${repo}/${latestChat.id}`);
                }}
                className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                {repo}
              </li>
            )
          )}
        </ul>

      </div>
    </div>
  );
};

export default Home;
