import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { getQuotes, updateQuoteStatus } from '../../utils/api';

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadQuotes();
  }, [filter]);

  const loadQuotes = () => {
    getQuotes(filter)
      .then(res => setQuotes(res.data))
      .catch(err => console.error(err));
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateQuoteStatus(id, status);
      loadQuotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-jetBlack">
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-pureWhite hover:text-neonAqua transition-colors">
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-neonAqua">Quote Requests</h1>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-jetBlack border border-neonAqua/30 text-pureWhite rounded-lg [&>option]:bg-jetBlack"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote._id} className="glass-card rounded-2xl p-6 border border-neonAqua/20 hover:border-neonAqua/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-pureWhite">{quote.name}</h3>
                  <p className="text-softGrey">{quote.email}</p>
                  {quote.phone && <p className="text-softGrey">{quote.phone}</p>}
                </div>
                <select
                  value={quote.status}
                  onChange={(e) => handleStatusChange(quote._id, e.target.value)}
                  className={`px-4 py-2 rounded-lg font-semibold border ${
                    quote.status === 'new' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                    quote.status === 'in-progress' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' :
                    'bg-green-900/30 text-green-400 border-green-500/30'
                  } [&>option]:bg-jetBlack [&>option]:text-pureWhite`}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              {quote.projectType && (
                <p className="text-sm text-softGrey mb-2">
                  <strong className="text-neonAqua">Project Type:</strong> {quote.projectType}
                </p>
              )}
              {quote.budget && (
                <p className="text-sm text-softGrey mb-2">
                  <strong className="text-neonAqua">Budget:</strong> {quote.budget}
                </p>
              )}
              
              <p className="text-pureWhite mb-4">{quote.message}</p>
              
              <p className="text-sm text-softGrey">
                Submitted: {new Date(quote.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;
