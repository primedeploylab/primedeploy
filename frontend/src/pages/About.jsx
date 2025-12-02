import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import AnimatedCounter from '../components/AnimatedCounter';
import { getSiteSettings } from '../utils/api';
import Reveal from '../components/Reveal';

import PageWrapper from '../components/PageWrapper';

const About = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  // Default stats if not set in admin
  const defaultStats = [
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 30, label: 'Happy Clients', suffix: '+' },
    { number: 5, label: 'Years Experience', suffix: '+' },
    { number: 100, label: 'Client Satisfaction', suffix: '%' }
  ];

  const stats = settings?.stats || defaultStats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>About Us - DeployPrime</title>
        <meta name="description" content="Learn more about DeployPrime and our mission to turn ideas into reality." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants} className="text-5xl font-bold text-pureWhite mb-6">
              {settings?.about?.title || 'About Us'}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-2xl text-softGrey max-w-3xl mx-auto">
              {settings?.about?.subtitle || 'We turn your ideas into powerful digital products.'}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={settings?.about?.imageUrl || 'https://via.placeholder.com/600x400'}
                alt="About DeployPrime"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold text-pureWhite mb-6">
                {settings?.about?.mainHeading || 'Building Digital Excellence Since Day One'}
              </motion.h2>
              <motion.p variants={itemVariants} className="text-pureWhite mb-6 leading-relaxed">
                {settings?.about?.description1 || 'DeployPrime is a freelance agency specializing in web development, mobile app development, and UI/UX design. We work with businesses of all sizes to create digital solutions that drive growth and deliver exceptional user experiences.'}
              </motion.p>
              <motion.p variants={itemVariants} className="text-pureWhite mb-8 leading-relaxed">
                {settings?.about?.description2 || 'Our team combines technical expertise with creative thinking to build products that not only look great but also perform flawlessly. From concept to deployment, we\'re with you every step of the way.'}
              </motion.p>

              <motion.div variants={containerVariants} className="space-y-4">
                {(settings?.about?.features || [
                  'Expert team with years of experience',
                  'Client-focused approach',
                  'Modern technologies and best practices',
                  'Ongoing support and maintenance'
                ]).map((item, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-neonAqua/20 border border-neonAqua/50 rounded-full flex items-center justify-center">
                      <FaCheck className="text-neonAqua text-xs" />
                    </div>
                    <span className="text-pureWhite font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-pureWhite mb-4">
              {settings?.about?.statsHeading || 'Our Achievements'}
            </motion.h2>
            <motion.p variants={itemVariants} className="text-softGrey text-lg">
              {settings?.about?.statsSubheading || 'Numbers that speak for themselves'}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                className="text-center p-8 rounded-2xl hover-lift group"
                style={{
                  background: 'rgba(26, 26, 26, 0.25)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(0, 232, 255, 0.15)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)'
                }}
              >
                <div className="mb-3">
                  <AnimatedCounter
                    end={stat.number}
                    duration={2.5}
                    suffix={stat.suffix || ''}
                    prefix={stat.prefix || ''}
                  />
                </div>
                <div className="text-softGrey text-sm md:text-base font-medium group-hover:text-pureWhite transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default About;
