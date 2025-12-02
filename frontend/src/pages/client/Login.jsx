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

        <div className="modern-card max-w-md w-full rounded-2xl p-8 relative z-10">
          <h1 className="text-3xl font-bold text-pureWhite mb-2 text-center">Login</h1>
          <p className="text-softGrey mb-8 text-center">Sign in to leave a review</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-softGrey mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2 ml-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2 ml-1">
                Password *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="neon-button w-full py-4 rounded-lg font-bold text-base mt-6 hover:shadow-[0_0_30px_rgba(0,232,255,0.3)] transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-softGrey mt-6">
            Don't have an account?{' '}
            <Link to="/client/register" className="text-neonAqua hover:text-pureWhite transition-colors font-medium">
              Register
            </Link>
          </p>

          <p className="text-center mt-6">
            <Link to="/" className="text-softGrey hover:text-pureWhite transition-colors text-sm flex items-center justify-center gap-2 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
