import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { getBlog } from '../utils/api';

import PageWrapper from '../components/PageWrapper';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlog(slug)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!blog) {
    return <div className="pt-20 min-h-screen flex items-center justify-center bg-jetBlack text-pureWhite">Loading...</div>;
  }

  const shareUrl = window.location.href;

  return (
    <PageWrapper>
      <Helmet>
        <title>{blog.seoMeta?.title || blog.title} - DeployPrime</title>
        <meta name="description" content={blog.seoMeta?.description || blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.seoMeta?.ogImage || blog.featuredImage?.url} />
      </Helmet>

      <article className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blogs" className="text-neonAqua hover:text-pureWhite mb-6 inline-block transition-colors">
            ← Back to Blogs
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-softGrey mb-4">
                <span>{blog.author}</span>
                <span>•</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <h1 className="text-5xl font-bold text-pureWhite mb-6">{blog.title}</h1>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-jetBlack/50 border border-neonAqua/30 text-neonAqua text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {blog.featuredImage?.url && (
              <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10">
                <img
                  src={blog.featuredImage.url}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg prose-invert max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Share Buttons */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-semibold text-pureWhite mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(blog.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-400/20 text-blue-400 border border-blue-400/50 rounded-full hover:bg-blue-400 hover:text-white transition-all"
                >
                  <FaTwitter />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-600/20 text-blue-600 border border-blue-600/50 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FaFacebook />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-blue-700/20 text-blue-700 border border-blue-700/50 rounded-full hover:bg-blue-700 hover:text-white transition-all"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </PageWrapper>
  );
};

export default BlogDetail;
