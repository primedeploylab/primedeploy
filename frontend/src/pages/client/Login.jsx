import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { clientLogin } from '../../utils/api';

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email && !formData.phone) {
      setError('Please provide either email or phone number');
      return;
    }

    try {
      const res = await clientLogin(formData);
      localStorage.setItem('clientToken', res.data.token);
      localStorage.setItem('clientUser', JSON.stringify(res.data.user));
      navigate('/client/review');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Login - DeployPrime</title>
      </Helmet>

      <div className="min-h-screen bg-jetBlack flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonAqua/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-softPurple/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 relative z-10">
          <h1 className="text-3xl font-bold text-pureWhite mb-2">Login</h1>
          <p className="text-softGrey mb-8">Sign in to leave a review</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-softGrey mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="neon-button w-full py-4 rounded-lg font-bold text-base mt-6"
            >
              Login
            </button>
          </form>

          <p className="text-center text-softGrey mt-6">
            Don't have an account?{' '}
            <Link to="/client/register" className="text-neonAqua hover:text-pureWhite transition-colors">
              Register
            </Link>
          </p>

          <p className="text-center mt-4">
            <Link to="/" className="text-softGrey hover:text-pureWhite transition-colors text-sm">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
