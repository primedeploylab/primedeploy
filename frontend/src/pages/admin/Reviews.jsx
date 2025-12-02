import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaCheck, FaTimes } from 'react-icons/fa';
import { getAdminReviews, approveReview, rejectReview, deleteReview } from '../../utils/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadReviews();
  }, [filter]);

  const loadReviews = () => {
    getAdminReviews(filter)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  };

  const handleApprove = async (id) => {
    try {
      await approveReview(id);
      loadReviews();
    } catch (err) {
      alert('Error approving review');
    }
  };

  const handleReject = async (id) => {
    const reason = prompt('Rejection reason:');
    if (reason) {
      try {
        await rejectReview(id, reason);
        loadReviews();
      } catch (err) {
        alert('Error rejecting review');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this review?')) {
      try {
        await deleteReview(id);
        loadReviews();
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
            <h1 className="text-2xl font-bold text-neonAqua">Manage Reviews</h1>
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-jetBlack border border-neonAqua/30 text-pureWhite rounded-lg [&>option]:bg-jetBlack"
          >
            <option value="">All Reviews</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="glass-card rounded-2xl p-6 border border-neonAqua/20 hover:border-neonAqua/40 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-bold text-pureWhite">{review.clientUser.name}</span>
                    <span className="text-softGrey">•</span>
                    <span className="text-sm text-softGrey">{review.clientUser.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={star <= review.rating ? 'text-yellow-400' : 'text-white/20'}
                      />
                    ))}
                    <span className="text-sm text-softGrey">
                      for <strong className="text-neonAqua">{review.project ? review.project.title : (review.projectName || 'General Review')}</strong>
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border ${review.isApproved ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30'
                  }`}>
                  {review.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>

              <p className="text-pureWhite mb-4">{review.reviewText}</p>

              {review.rejectionReason && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
                  <p className="text-sm text-red-400">
                    <strong>Rejection Reason:</strong> {review.rejectionReason}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-softGrey">
                  Submitted: {new Date(review.createdAt).toLocaleString()}
                </span>
                <div className="flex space-x-2">
                  {!review.isApproved && (
                    <>
                      <button
                        onClick={() => handleApprove(review._id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-600/80 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        <FaCheck />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(review._id)}
                        className="flex items-center space-x-1 px-4 py-2 bg-yellow-600/80 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                      >
                        <FaTimes />
                        <span>Reject</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
