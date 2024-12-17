import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Check if user is an admin
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      localStorage.removeItem('user');
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="bg-black text-white py-4 px-8 shadow-lg">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:underline flex items-center">
  <img src="logo.png" alt="Location" className="w-20 h-15 mr-2" />
  Campus EventHub - Acity
</Link>


        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
            Home
          </Link>
          <Link to="/events" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
            Events
          </Link>
          <Link to="/calendar" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
            Calendar
          </Link>
          {user ? (
            <>
              <Link to="/useraccount" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
                My Account
              </Link>
              {isAdmin && (
                <Link to="/createEvent" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
                  Create Event
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline bg-red-500 px-4 py-2 rounded text-white font-bold">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
