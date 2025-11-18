
import { useAuth } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Admin Dashboard";
    if (path === "/user") return "User Dashboard";
    if (path === "/store-owner") return "Store Owner Dashboard";
    return "Store Rating App";
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Title */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* Right side - User info & logout */}
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-150 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;