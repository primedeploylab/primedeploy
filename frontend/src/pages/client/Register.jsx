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

        <div className="modern-card max-w-md w-full rounded-2xl p-8 relative z-10 text-center border border-white/10">
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

        <div className="modern-card max-w-md w-full rounded-2xl p-8 relative z-10">
          <h1 className="text-3xl font-bold text-pureWhite mb-2 text-center">Register</h1>
          <p className="text-softGrey mb-8 text-center">Create an account to leave reviews</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-softGrey mb-2 ml-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
                placeholder="John Doe"
              />
            </div>

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
                Password * (min 6 characters)
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="modern-input w-full px-4 py-3 rounded-lg text-pureWhite placeholder-white/30 outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-softGrey mb-2 ml-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              Register
            </button>
          </form>

          <p className="text-center text-softGrey mt-6">
            Already have an account?{' '}
            <Link to="/client/login" className="text-neonAqua hover:text-pureWhite transition-colors font-medium">
              Login
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

export default ClientRegister;
