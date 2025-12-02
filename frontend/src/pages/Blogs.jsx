import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getBlogs } from '../utils/api';
import Reveal from '../components/Reveal';

import PageWrapper from '../components/PageWrapper';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBlogs(page, 9)
      .then(res => {
        setBlogs(res.data.blogs);
        setPagination(res.data.pagination);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Blog - DeployPrime</title>
        <meta name="description" content="Read our latest articles on web development, mobile apps, and design." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Reveal width="100%">
              <h1 className="text-5xl font-bold text-pureWhite mb-6">Our Blog</h1>
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-2xl text-softGrey max-w-3xl mx-auto">
                Insights, tutorials, and updates from our team
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Reveal key={blog._id} delay={index * 0.1}>
                <article className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-neonAqua/30 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.featuredImage?.url || 'https://via.placeholder.com/800x400'}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-sm text-softGrey mb-3">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-xl font-bold text-pureWhite mb-3">{blog.title}</h2>
                    <p className="text-softGrey mb-4">{blog.excerpt}</p>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-jetBlack/50 border border-neonAqua/30 text-neonAqua text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="text-neonAqua font-semibold hover:text-pureWhite transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center mt-12 space-x-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${page === pageNum
                    ? 'bg-neonAqua text-jetBlack'
                    : 'bg-jetBlack/50 text-pureWhite border border-neonAqua/30 hover:bg-neonAqua/10'
                    }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Blogs;
