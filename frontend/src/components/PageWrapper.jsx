import { motion } from 'framer-motion';

const PageWrapper = ({ children, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className={`pt-20 min-h-screen bg-jetBlack relative overflow-hidden ${className}`}
        >
            {/* Background Neon Glows */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-softPurple/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-neonAqua/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default PageWrapper;
