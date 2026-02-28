import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700"
            >
              WSConnect
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-purple-600 hover:text-purple-900 font-medium"
                  >
                    管理后台
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  个人中心
                </Link>
                <Link
                  to="/create-post"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  发布经历
                </Link>
                <span className="text-gray-700">
                  欢迎，{user?.username}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;