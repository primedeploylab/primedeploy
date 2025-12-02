import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { clientRegister, clientLogin } from '../../utils/api';

const ClientRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-jetBlack flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonAqua/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-softPurple/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 relative z-10 text-center">
          <h1 className="text-3xl font-bold text-pureWhite mb-4">Welcome Back!</h1>
          <p className="text-softGrey mb-8">You are already logged in.</p>

          <button
            onClick={() => navigate('/client/review')}
            className="neon-button w-full py-4 rounded-lg font-bold text-base mb-4"
          >
            Continue to Write Review
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('clientToken');
              localStorage.removeItem('clientUser');
              setIsLoggedIn(false);
            }}
            className="text-softGrey hover:text-pureWhite transition-colors text-sm"
          >
            Logout and Register as New User
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.email && !formData.phone) {
      setError('Please provide either email or phone number');
      return;
    }

    try {
      await clientRegister(formData);

      // Auto login after registration
      const loginRes = await clientLogin({
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      localStorage.setItem('clientToken', loginRes.data.token);
      localStorage.setItem('clientUser', JSON.stringify(loginRes.data.user));

      setSuccess(true);
      // Redirect to review page immediately
      navigate('/client/review');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      <Helmet>
        <title>Client Registration - DeployPrime</title>
      </Helmet>

      <div className="min-h-screen bg-jetBlack flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonAqua/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-softPurple/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 relative z-10">
          <h1 className="text-3xl font-bold text-pureWhite mb-2">Register</h1>
          <p className="text-softGrey mb-8">Create an account to leave reviews</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-softGrey mb-2">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>

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
                Password * (min 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              Register
            </button>
          </form>

          <p className="text-center text-softGrey mt-6">
            Already have an account?{' '}
            <Link to="/client/login" className="text-neonAqua hover:text-pureWhite transition-colors">
              Login
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

export default ClientRegister;
