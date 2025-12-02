import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { submitQuote } from '../utils/api';

import PageWrapper from '../components/PageWrapper';

const Quote = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    budget: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await submitQuote(formData);
      setStatus({ type: 'success', message: 'Quote request submitted successfully! We\'ll get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '', budget: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to submit quote. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Get a Quote - DeployPrime</title>
        <meta name="description" content="Request a quote for your web or mobile development project." />
      </Helmet>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-pureWhite mb-6">Get a Quote</h1>
            <p className="text-xl text-softGrey">
              Tell us about your project and we'll get back to you with a custom quote
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-6 md:p-8 border border-neonAqua/30"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-pureWhite mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-pureWhite mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-pureWhite mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-pureWhite mb-1">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite [&>option]:bg-jetBlack"
                  >
                    <option value="">Select a type</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile App</option>
                    <option value="design">UI/UX Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-pureWhite mb-1">
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite [&>option]:bg-jetBlack"
                >
                  <option value="">Select a range</option>
                  <option value="<5k">Less than $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k+">$25,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-pureWhite mb-1">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-jetBlack/50 border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {status.message && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'
                  }`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-3 bg-gradient-to-r from-neonAqua to-softPurple text-white rounded-lg font-bold hover:shadow-[0_0_20px_rgba(0,232,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Quote Request'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Quote;
