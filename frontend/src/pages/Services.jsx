import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getServices } from '../utils/api';
import Reveal from '../components/Reveal';

import PageWrapper from '../components/PageWrapper';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices()
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <title>Our Services - DeployPrime</title>
        <meta name="description" content="Professional web development, mobile app development, and UI/UX design services." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Reveal width="100%">
              <h1 className="text-5xl font-bold text-pureWhite mb-6">Our Services</h1>
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-2xl text-softGrey max-w-3xl mx-auto">
                Comprehensive digital solutions tailored to your needs
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Reveal key={service._id} delay={index * 0.1}>
                <div
                  id={service.slug}
                  className="glass-card rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:shadow-neonAqua/20 transition-all border border-neonAqua/30 h-full"
                >
                  <div className="text-6xl mb-6 text-neonAqua">{service.icon}</div>
                  <h2 className="text-2xl font-bold text-pureWhite mb-4">{service.title}</h2>
                  <p className="text-softGrey mb-6">{service.shortDesc}</p>

                  {service.details && (
                    <p className="text-pureWhite mb-6">{service.details}</p>
                  )}

                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-pureWhite mb-3">What you get:</h3>
                      <ul className="space-y-2">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-neonAqua mr-2">✓</span>
                            <span className="text-softGrey">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.priceEstimate && (
                    <div className="text-neonAqua font-semibold">
                      Starting from {service.priceEstimate}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Services;
