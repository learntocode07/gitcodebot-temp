import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to EduChat</h1>
      <button
        onClick={() => navigate('/chat')}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        New Chat
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Recent Chats</h2>
        <ul className="mt-2 space-y-2">
          <li className="p-2 bg-gray-100 rounded">Math Doubts</li>
          <li className="p-2 bg-gray-100 rounded">Science Help</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
