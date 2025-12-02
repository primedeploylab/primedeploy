import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(credentials);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jetBlack flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonAqua/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-softPurple/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="modern-card max-w-md w-full rounded-2xl p-8 relative z-10">
        <h1 className="text-3xl font-bold text-pureWhite mb-2 text-center">Admin Login</h1>
        <p className="text-softGrey mb-8 text-center">Sign in to manage your portfolio</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pureWhite mb-2 ml-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pureWhite mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="neon-button w-full px-8 py-4 rounded-lg font-semibold disabled:opacity-50 hover:shadow-[0_0_30px_rgba(0,232,255,0.3)] transition-all duration-300"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
