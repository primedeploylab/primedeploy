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
    <div className="min-h-screen bg-gradient-to-br from-jetBlack via-charcoal to-jetBlack flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl shadow-2xl p-8" style={{
        background: 'rgba(26, 26, 26, 0.8)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(0, 232, 255, 0.2)'
      }}>
        <h1 className="text-3xl font-bold text-pureWhite mb-2">Admin Login</h1>
        <p className="text-softGrey mb-8">Sign in to manage your portfolio</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pureWhite mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-neonAqua text-pureWhite placeholder-softGrey"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pureWhite mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-neonAqua text-pureWhite placeholder-softGrey"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-900/30 text-red-400 border border-red-500/30 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="neon-button w-full px-8 py-4 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
