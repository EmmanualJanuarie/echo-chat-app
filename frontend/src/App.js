import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoadingPage from './pages/LoadingPage';
import Signin from './pages/Signin';
import SignUp from './pages/Signup';
import UserProfile from './pages/UserProfile';
import ResetPassword from './pages/ResetPassword';
import ChatAppPage from './pages/ChatAppPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/chats" element={<ChatAppPage />} />
        {/* <Route path="/chats" /> */}
      </Routes>
    </div>
  );
}

export default App;
