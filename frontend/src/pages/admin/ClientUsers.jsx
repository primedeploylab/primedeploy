import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { getClientUsers, approveClientUser, deleteClientUser } from '../../utils/api';

const AdminClientUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const loadUsers = () => {
    getClientUsers(filter)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleApprove = async (id) => {
    try {
      await approveClientUser(id);
      loadUsers();
    } catch (err) {
      alert('Error approving user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await deleteClientUser(id);
        loadUsers();
      } catch (err) {
        console.error(err);
      }
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
            <h1 className="text-2xl font-bold text-neonAqua">Manage Client Users</h1>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-jetBlack border border-neonAqua/30 text-pureWhite rounded-lg [&>option]:bg-jetBlack"
          >
            <option value="">All Users</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="glass-card rounded-2xl overflow-hidden border border-neonAqua/20">
          <table className="w-full">
            <thead className="bg-charcoal border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Contact</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Registered</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-semibold text-pureWhite">{user.name}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-softGrey">
                      {user.email && <p>{user.email}</p>}
                      {user.phone && <p>{user.phone}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm border ${user.isApproved ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30'
                      }`}>
                      {user.isApproved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-softGrey">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {!user.isApproved && (
                        <button
                          onClick={() => handleApprove(user._id)}
                          className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClientUsers;
