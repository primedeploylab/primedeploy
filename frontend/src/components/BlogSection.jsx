import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getBlogs } from '../utils/api';
import Reveal from './Reveal';

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        // Fetch latest blogs
        getBlogs(1, 6).then(res => {
            if (res.data && res.data.blogs) {
                setBlogs(res.data.blogs);
            }
        }).catch(console.error);
    }, []);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { current } = scrollContainerRef;
            const scrollAmount = 320; // Approximate card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (blogs.length === 0) return null;

    return (
        <section className="py-10 relative z-10 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonAqua/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-row justify-between items-center mb-6 gap-4">
                    <Reveal>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-pureWhite whitespace-nowrap">
                            Latest Blogs
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Link
                            to="/blogs"
                            className="neon-button inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-2 rounded-full font-bold text-sm md:text-base whitespace-nowrap"
                        >
                            View blog
                        </Link>
                    </Reveal>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {blogs.map((blog, index) => (
                            <div
                                key={blog._id}
                                className="w-[280px] md:w-[320px] snap-start flex-shrink-0"
                            >
                                <Reveal delay={index * 0.1} width="100%">
                                    <div className="group cursor-pointer">
                                        {/* Image */}
                                        <Link to={`/blogs/${blog.slug}`} className="block overflow-hidden rounded-2xl mb-4 relative aspect-square">
                                            <div className="absolute inset-0 bg-jetBlack/20 group-hover:bg-transparent transition-colors z-10"></div>
                                            <img
                                                src={blog.featuredImage?.url || 'https://via.placeholder.com/400x400'}
                                                alt={blog.title}
                                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                            />
                                            {/* Logo Overlay (Optional branding touch) */}
                                            <div className="absolute top-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {/* Placeholder for logo if needed */}
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="flex flex-col">
                                            <h3 className="text-xl font-bold text-pureWhite mb-3 line-clamp-2 group-hover:text-neonAqua transition-colors">
                                                <Link to={`/blogs/${blog.slug}`}>
                                                    {blog.title}
                                                </Link>
                                            </h3>

                                            <div className="flex items-center text-softGrey text-sm mb-4 space-x-3">
                                                <span>{new Date(blog.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                {blog.category && (
                                                    <>
                                                        <span className="w-1 h-1 bg-softGrey rounded-full"></span>
                                                        <span>{blog.category}</span>
                                                    </>
                                                )}
                                                {!blog.category && (
                                                    <>
                                                        <span className="w-1 h-1 bg-softGrey rounded-full"></span>
                                                        <span>Product</span>
                                                    </>
                                                )}
                                            </div>

                                            <Link
                                                to={`/blogs/${blog.slug}`}
                                                className="text-sm text-pureWhite font-medium inline-flex items-center group-hover:text-neonAqua transition-colors"
                                            >
                                                Read blog <span className="ml-2 text-lg">›</span>
                                            </Link>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end items-center mt-8">
                    {/* Arrows */}
                    <div className="flex space-x-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-pureWhite transition-colors"
                            aria-label="Scroll left"
                        >
                            <FaArrowLeft />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-pureWhite transition-colors"
                            aria-label="Scroll right"
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
