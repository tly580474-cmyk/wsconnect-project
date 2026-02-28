import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { postApi } from '../services/api';
import type { Post } from '../types/post';
import LoginModal from '../components/LoginModal';
import { getCategoryColor } from '../utils/categoryUtils';

const extractPlainText = (html: string): string => {
  if (!html) return '';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const images = tempDiv.querySelectorAll('img');
  images.forEach(img => img.remove());
  
  return tempDiv.textContent || tempDiv.innerText || '';
};

const Home = () => {
  const { isAuthenticated } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (query?: string) => {
    setLoading(true);
    try {
      const data = await postApi.getPosts(query);
      setPosts(data);
    } catch (err) {
      console.error('加载帖子失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadPosts(searchQuery);
  };

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/create-post');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            跨代交流，连接彼此
          </h1>
          <p className="text-xl text-gray-600">
            分享你的经历，倾听他人的故事
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">帖子列表</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                <input
                  type="text"
                  placeholder="搜索帖子..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 font-medium whitespace-nowrap"
                >
                  搜索
                </button>
              </form>
              <button
                onClick={handleCreatePost}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium whitespace-nowrap"
              >
                发布经历
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">加载中...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">暂无帖子，快来发布第一个经历吧！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {extractPlainText(post.content)}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <span>{post.authorName}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">👴</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">分享智慧</h3>
            <p className="text-gray-600">年长者分享人生经验和智慧</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">👦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">带来活力</h3>
            <p className="text-gray-600">年轻人分享新鲜观点和想法</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">彼此获益</h3>
            <p className="text-gray-600">跨代交流，共同成长</p>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        message="发布帖子需要先登录"
      />
    </div>
  );
};

export default Home;