import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white shadow-lg p-6 rounded w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input type="email" className="border w-full p-2 mb-4" placeholder="Email" required />
        <input type="password" className="border w-full p-2 mb-4" placeholder="Password" required />
        <button className="bg-blue-600 text-white px-4 py-2 w-full rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
