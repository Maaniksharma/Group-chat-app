import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userName, email: userEmail } = user;
  const handleLogout = () => {
    if (!userEmail) navigate('/login');
    logout();
    navigate('/login');
  };
  return (
    <nav className="flex justify-between items-center p-5 bg-blue-500 text-white">
      <Link to="/">
        <h1 className="text-xl md:text-2xl">Chat Karo</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <p>{userEmail ? `Welcome, ${userName}` : 'Welcome'}</p>
        <div onClick={handleLogout}>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-blue-800 ">
            {userEmail ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
