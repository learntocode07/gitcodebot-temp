import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
     <Route path="/chat/:repoName/:chatId" element={<ChatPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
