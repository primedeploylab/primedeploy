import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { getSiteSettings } from '../utils/api';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings()
      .then(res => setSettings(res.data))
      .catch(err => console.error(err));
  }, []);

  const socialIcons = {
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    facebook: FaFacebook
  };

  return (
    <footer className="bg-jetBlack border-t border-white/5 text-pureWhite pt-20 pb-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-neonAqua to-transparent opacity-50 shadow-[0_0_50px_rgba(0,232,255,0.5)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Column - Large */}
          <div className="lg:col-span-5">
            <Link to="/" className="block mb-8">
              {settings?.logoUrl ? (
                <img src={settings.logoUrl} alt="DeployPrime" className="h-16" />
              ) : (
                <span className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-pureWhite to-softGrey">
                  DeployPrime
                </span>
              )}
            </Link>
            <p className="text-xl text-softGrey leading-relaxed max-w-md mb-8">
              {settings?.footer?.companyBrief || 'We turn your ideas into powerful digital products. Let\'s build something extraordinary together.'}
            </p>
            <div className="flex space-x-6">
              {settings?.socialLinks && Object.entries(settings.socialLinks).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                return url && Icon ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-softGrey hover:bg-neonAqua hover:text-jetBlack transition-all duration-300"
                  >
                    <Icon size={20} />
                  </a>
                ) : null;
              })}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-pureWhite mb-8 uppercase tracking-widest border-b border-neonAqua/30 pb-2 inline-block">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'Services', 'Projects', 'Blogs', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-softGrey hover:text-neonAqua transition-colors text-lg flex items-center group"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-4 transition-all duration-300 text-neonAqua mr-0 group-hover:mr-2">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-lg font-bold text-pureWhite mb-8 uppercase tracking-widest border-b border-neonAqua/30 pb-2 inline-block">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="mt-1 text-neonAqua">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-softGrey uppercase tracking-wider mb-1">Email Us</p>
                  <a href={`mailto:${settings?.footer?.email || 'hello@deployprime.com'}`} className="text-xl font-bold text-pureWhite hover:text-neonAqua transition-colors">
                    {settings?.footer?.email || 'hello@deployprime.com'}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="mt-1 text-neonAqua">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm text-softGrey uppercase tracking-wider mb-1">Visit Us</p>
                  <p className="text-lg text-pureWhite">
                    {settings?.footer?.location || 'San Francisco, CA'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-softGrey text-sm">
            &copy; {new Date().getFullYear()} DeployPrime. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-softGrey hover:text-pureWhite transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-softGrey hover:text-pureWhite transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
