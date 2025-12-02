import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaProjectDiagram, FaBlog, FaCog, FaEnvelope, FaSignOutAlt, FaFileContract, FaStar, FaUsers, FaCogs } from 'react-icons/fa';
import { getAdminProjects, getAdminBlogs, getQuotes, getContracts, getReviews, getClientUsers, getAdminServices } from '../../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, quotes: 0, contracts: 0, reviews: 0, clients: 0, services: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      const newStats = { projects: 0, blogs: 0, quotes: 0, contracts: 0, reviews: 0, clients: 0, services: 0 };

      try {
        const projects = await getAdminProjects();
        newStats.projects = projects.data.length || 0;
      } catch (err) {
        console.error('Projects error:', err);
      }

      try {
        const blogs = await getAdminBlogs();
        newStats.blogs = blogs.data.length || 0;
      } catch (err) {
        console.error('Blogs error:', err);
      }

      try {
        const quotes = await getQuotes();
        newStats.quotes = quotes.data.length || 0;
      } catch (err) {
        console.error('Quotes error:', err);
      }

      try {
        const contracts = await getContracts();
        newStats.contracts = contracts.data.length || 0;
      } catch (err) {
        console.error('Contracts error:', err);
      }

      try {
        const reviews = await getReviews();
        newStats.reviews = reviews.data?.reviews?.length || 0;
      } catch (err) {
        console.error('Reviews error:', err);
      }

      try {
        const clients = await getClientUsers();
        newStats.clients = clients.data.length || 0;
      } catch (err) {
        console.error('Clients error:', err);
      }

      try {
        const services = await getAdminServices();
        newStats.services = services.data.length || 0;
      } catch (err) {
        console.error('Services error:', err);
      }

      setStats(newStats);
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: FaProjectDiagram, label: 'Projects', path: '/admin/projects', count: stats.projects },
    { icon: FaCogs, label: 'Services', path: '/admin/services', count: stats.services },
    { icon: FaBlog, label: 'Blogs', path: '/admin/blogs', count: stats.blogs },
    { icon: FaEnvelope, label: 'Quotes', path: '/admin/quotes', count: stats.quotes },
    { icon: FaFileContract, label: 'Contracts', path: '/admin/contracts', count: stats.contracts },
    { icon: FaStar, label: 'Reviews', path: '/admin/reviews', count: stats.reviews },
    { icon: FaUsers, label: 'Client Users', path: '/admin/client-users', count: stats.clients },
    { icon: FaUsers, label: 'About Us', path: '/admin/about' },
    { icon: FaCog, label: 'Settings', path: '/admin/settings' }
  ];

  return (
    <div className="min-h-screen bg-jetBlack">
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-neonAqua">DeployPrime Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600/80 rounded-lg hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-pureWhite mb-8">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="glass-card rounded-2xl p-6 border border-neonAqua/20 hover:border-neonAqua/50 hover:shadow-[0_0_20px_rgba(0,232,255,0.15)] transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <item.icon className="text-4xl text-neonAqua group-hover:scale-110 transition-transform" />
                {item.count !== undefined && (
                  <span className="text-3xl font-bold text-pureWhite">{item.count}</span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-pureWhite">{item.label}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
