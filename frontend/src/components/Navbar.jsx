import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <Link
        to={user ? "/dashboard" : "/"}
        className="text-2xl font-bold text-blue-600"
      >
        SmartResume AI
      </Link>

      <div className="flex items-center gap-6">
        {!user && (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </>
        )}

        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <svg
                className={`w-4 text-gray-700 transition ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-2xl shadow-xl p-3 animate-scaleFade z-50">
                <div className="px-3 py-3 border-b">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <span>👤</span> Profile
                </Link>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <span>📄</span> Dashboard
                </Link>

                <Link
                  to="/editor/new"
                  className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                >
                  <span>➕</span> Create Resume
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                >
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
