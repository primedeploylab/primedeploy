import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

const ReviewsCarousel = ({ reviews, stats }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 2.5 seconds
  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isPaused, reviews.length]);

  const nextSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setIsPaused(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-grey">No reviews yet. Be the first to leave a review!</p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative">
      {/* Overall Rating */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center space-x-4 bg-white/5 px-8 py-4 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neonAqua to-softPurple">{stats.averageRating}</span>
          <div className="text-left">
            <div className="flex space-x-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= Math.round(stats.averageRating) ? 'text-neonAqua' : 'text-softGrey/30'}
                  size={20}
                />
              ))}
            </div>
            <p className="text-sm font-bold text-pureWhite uppercase tracking-wider">{stats.total} Verified Reviews</p>
          </div>
        </div>
      </div>

      {/* Review Card */}
      <div className="relative min-h-[400px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateX: -15, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 15, y: -50 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="w-full max-w-2xl mx-auto bg-jetBlack/80 backdrop-blur-xl border border-neonAqua/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden"
          >
            {/* Decorative Quote Mark */}
            <div className="absolute top-4 left-6 text-6xl text-white/5 font-serif">"</div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Stars */}
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= currentReview.rating ? 'text-neonAqua drop-shadow-[0_0_5px_rgba(0,232,255,0.5)]' : 'text-softGrey/20'}
                    size={20}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-pureWhite text-lg md:text-xl font-light leading-relaxed mb-6 max-w-xl">
                {currentReview.reviewText}
              </p>

              {/* Divider */}
              <div className="w-20 h-1 bg-gradient-to-r from-neonAqua to-softPurple rounded-full mb-8"></div>

              {/* Client Info */}
              <div>
                <p className="font-bold text-pureWhite text-lg tracking-wide">{currentReview.clientName}</p>
                {currentReview.project || currentReview.projectName ? (
                  <p className="text-sm text-neonAqua font-medium mt-1 uppercase tracking-widest">
                    {currentReview.project ? currentReview.project.title : currentReview.projectName}
                  </p>
                ) : (
                  <p className="text-sm text-softGrey mt-1 uppercase tracking-widest">Verified Client</p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-8 mt-12">
        <button
          onClick={prevSlide}
          className="p-4 bg-white/5 text-pureWhite rounded-full hover:bg-neonAqua hover:text-jetBlack transition-all duration-300 border border-white/10 hover:border-neonAqua"
        >
          <FaChevronLeft size={20} />
        </button>

        <div className="flex space-x-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-neonAqua w-12 shadow-[0_0_10px_rgba(0,232,255,0.5)]' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-4 bg-white/5 text-pureWhite rounded-full hover:bg-neonAqua hover:text-jetBlack transition-all duration-300 border border-white/10 hover:border-neonAqua"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
