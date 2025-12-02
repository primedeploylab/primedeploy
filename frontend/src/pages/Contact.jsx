import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { getSiteSettings } from '../utils/api';
import Reveal from '../components/Reveal';

import PageWrapper from '../components/PageWrapper';

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <title>Contact Us - DeployPrime</title>
        <meta name="description" content="Get in touch with DeployPrime for your next project." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Reveal width="100%">
              <h1 className="text-5xl font-bold text-pureWhite mb-6">Contact Us</h1>
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-xl text-softGrey">
                Let's discuss your next project
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="glass-card rounded-2xl p-8 shadow-lg text-center border border-neonAqua/30 h-full">
                <div className="w-16 h-16 bg-neonAqua/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-neonAqua/50">
                  <FaEnvelope className="text-neonAqua text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-pureWhite mb-2">Email</h3>
                <p className="text-softGrey">{settings?.footer?.email || 'hello@deployprime.com'}</p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass-card rounded-2xl p-8 shadow-lg text-center border border-neonAqua/30 h-full">
                <div className="w-16 h-16 bg-neonAqua/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-neonAqua/50">
                  <FaPhone className="text-neonAqua text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-pureWhite mb-2">Phone</h3>
                <p className="text-softGrey">{settings?.phoneNumber || '+1234567890'}</p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass-card rounded-2xl p-8 shadow-lg text-center border border-neonAqua/30 h-full">
                <div className="w-16 h-16 bg-neonAqua/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-neonAqua/50">
                  <FaMapMarkerAlt className="text-neonAqua text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-pureWhite mb-2">Location</h3>
                <p className="text-softGrey">{settings?.footer?.location || 'San Francisco, CA'}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4} width="100%">
            <div className="mt-12 bg-charcoal border border-neonAqua/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-pureWhite mb-4">Working Hours</h2>
              <p className="text-softGrey">{settings?.footer?.workingHours || 'Mon-Fri: 9AM-6PM'}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Contact;
