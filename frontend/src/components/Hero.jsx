import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaPalette } from 'react-icons/fa';

import InteractiveParticles from './InteractiveParticles';
import SkillRing from './SkillRing';

const Hero = ({ settings }) => {
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const typedWords = settings?.hero?.typedWords || ['Web Dev', 'App Dev', 'UI Design'];
  const cards = [
    { role: 'Web Developer', tagline: 'Crafting web solutions', icon: <FaLaptopCode /> },
    { role: 'App Developer', tagline: 'Building mobile experiences', icon: <FaMobileAlt /> },
    { role: 'UI/UX Designer', tagline: 'Creating beautiful interfaces', icon: <FaPalette /> }
  ];

  // Typing animation effect
  useEffect(() => {
    const currentWord = typedWords[typedIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setTypedIndex((prev) => (prev + 1) % typedWords.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, typedIndex, typedWords]);

  // Card flipping effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [cards.length]);



  return (
    <section className="pt-20 md:pt-32 pb-2 relative overflow-hidden min-h-screen flex flex-col justify-center z-10">
      {/* Interactive Particles */}
      <InteractiveParticles />

      {/* Neon Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-softPurple/10 via-transparent to-neonAqua/10 pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ backgroundColor: 'rgba(108, 99, 255, 0.2)' }}></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s', backgroundColor: 'rgba(0, 232, 255, 0.2)' }}></div>

      {/* Contrast Overlay */}
      <div className="absolute inset-0 bg-jetBlack/40 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-2 md:gap-12 items-center w-full">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="z-10"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-2xl sm:text-5xl md:text-7xl font-bold text-pureWhite mb-2 md:mb-6 leading-tight"
            >
              {settings?.hero?.headline || 'Turn your ideas into reality.'}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="flex items-center mb-4 md:mb-8 h-6 md:h-12"
            >
              <div className="text-neonAqua font-bold text-lg sm:text-2xl md:text-4xl">
                <span className="inline-block neon-text">{typedText}</span>
                <span className="inline-block w-0.5 h-5 md:h-10 bg-neonAqua ml-1 animate-pulse shadow-neon"></span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="text-xs sm:text-base md:text-xl text-softGrey mb-4 md:mb-8 max-w-lg"
            >
              {settings?.hero?.subText || 'We build digital products that make a difference'}
            </motion.p>

            {/* CTA Button and Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="flex flex-col items-start gap-3 sm:gap-4"
            >
              <Link
                to="/quote"
                className="hidden md:inline-flex neon-button px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-bold hover-lift"
              >
                Get a Quote
              </Link>

              {/* Social Icons */}
              {settings?.socialLinks && Array.isArray(settings.socialLinks) && settings.socialLinks.length > 0 && (
                <div className="flex gap-2 sm:gap-3">
                  {settings.socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 md:w-12 md:h-12 glass-dark rounded-full flex items-center justify-center text-pureWhite transition-all hover:scale-110 hover:border-neonAqua/50 border border-white/10"
                    >
                      <span className="text-sm md:text-lg">{social.icon || '🔗'}</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Floating Icons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="flex justify-end relative h-[250px] sm:h-[400px] md:h-[500px] items-center"
          >
            {/* Background Glow Effect */}
            <div className="absolute w-32 h-32 md:w-64 md:h-64 rounded-full blur-[50px] md:blur-[100px] animate-pulse" style={{ backgroundColor: 'rgba(108, 99, 255, 0.3)' }}></div>
            <div className="absolute w-32 h-32 md:w-64 md:h-64 rounded-full blur-[50px] md:blur-[100px] animate-pulse right-20" style={{ animationDelay: '1s', backgroundColor: 'rgba(0, 232, 255, 0.2)' }}></div>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* Floating Icons Grid - Now Flipping */}
              <div className="relative w-full max-w-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCardIndex}
                    initial={{ opacity: 0, rotateX: -90, y: 40 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    exit={{ opacity: 0, rotateX: 90, y: -40 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="flex flex-col items-center justify-center gap-4 md:gap-6 group text-center"
                  >
                    {/* Icon */}
                    <div
                      className="w-20 h-20 md:w-40 md:h-40 rounded-2xl md:rounded-3xl flex items-center justify-center text-neonAqua transition-all duration-300"
                      style={{
                        background: 'rgba(0, 232, 255, 0.1)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(0, 232, 255, 0.3)',
                        boxShadow: '0 8px 32px 0 rgba(0, 232, 255, 0.2)'
                      }}
                    >
                      <div className="text-4xl md:text-7xl">
                        {cards[currentCardIndex].icon}
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-center">
                      <h3 className="text-xl md:text-5xl font-bold text-pureWhite group-hover:text-neonAqua transition-colors mb-1 md:mb-2">
                        {cards[currentCardIndex].role}
                      </h3>
                      <p className="text-xs md:text-xl text-softGrey">
                        {cards[currentCardIndex].tagline}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Get Quote Button - Centered below everything */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="flex md:hidden justify-center w-full mt-6 mb-4 relative z-20"
        >
          <Link
            to="/quote"
            className="neon-button px-10 py-3 rounded-full text-base font-bold hover-lift shadow-[0_0_20px_rgba(0,232,255,0.3)]"
          >
            Get a Quote
          </Link>
        </motion.div>
        {/* Mobile Decorative Ball */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-64 h-64 rounded-full blur-[80px] md:hidden pointer-events-none animate-pulse" style={{ backgroundColor: 'rgba(0, 232, 255, 0.2)' }}></div>
      </div>

      {/* Skill Icons Ring */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
        className="relative w-full flex flex-col items-center justify-center mt-auto pb-0 z-10"
      >

        <SkillRing skills={[
          { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
          { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
          { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
          { name: 'HTML5', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
          { name: 'CSS3', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
          { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
          { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
          { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
          { name: 'Flutter', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
          { name: 'Firebase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
          { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
          { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
          { name: 'Figma', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
          { name: 'Canva', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
          { name: 'Adobe XD', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg' },
          { name: 'Sketch', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sketch/sketch-original.svg' },
          { name: 'Tailwind', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
          { name: 'Next.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
          { name: 'Redux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
          { name: 'GraphQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' }
        ]} />
      </motion.div>
    </section >
  );
};

export default Hero;
