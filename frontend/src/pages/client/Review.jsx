import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaStar } from 'react-icons/fa';
import { submitReview } from '../../utils/api';

const ClientReview = () => {
    const [formData, setFormData] = useState({
        rating: 5,
        reviewText: '',
        projectId: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [hoveredStar, setHoveredStar] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await submitReview(formData);
            setSuccess('Review submitted successfully! It will be visible after admin approval.');
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to submit review');
        }
    };

    return (
        <>
            <Helmet>
                <title>Write a Review - DeployPrime</title>
            </Helmet>

            <div className="min-h-screen bg-jetBlack flex items-center justify-center px-4 py-20 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neonAqua/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-softPurple/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 relative z-10">
                    <h1 className="text-3xl font-bold text-pureWhite mb-2">Write a Review</h1>
                    <p className="text-softGrey mb-8">Share your experience working with us</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-softGrey mb-2">
                                Rating
                            </label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, rating: star })}
                                        onMouseEnter={() => setHoveredStar(star)}
                                        onMouseLeave={() => setHoveredStar(0)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <FaStar
                                            size={32}
                                            className={`${star <= (hoveredStar || formData.rating)
                                                ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                                                : 'text-white/20'
                                                } transition-colors`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-softGrey mb-2">
                                Project Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.projectName || ''}
                                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                                placeholder="e.g. E-commerce Website"
                                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none"
                            />
                        </div>

                        {/* Review Text */}
                        <div>
                            <label className="block text-sm font-medium text-softGrey mb-2">
                                Your Review
                            </label>
                            <textarea
                                required
                                rows="6"
                                value={formData.reviewText}
                                onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                                placeholder="Tell us about your experience..."
                                className="w-full px-4 py-3 bg-jetBlack/50 border border-white/10 rounded-lg focus:border-neonAqua focus:ring-1 focus:ring-neonAqua text-pureWhite placeholder-white/20 transition-all outline-none resize-none"
                            ></textarea>
                        </div>

                        {/* Messages */}
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm">
                                {success}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="neon-button w-full py-4 rounded-lg font-bold text-base mt-6"
                        >
                            Submit Review
                        </button>
                    </form>

                </div>
            </div>
        </>
    );
};

export default ClientReview;
