
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FaLaptopCode, FaMobileAlt, FaPalette, FaRocket, FaUsers, FaClock, FaHeart } from 'react-icons/fa';
import AnimatedCounter from '../components/AnimatedCounter';
import Hero from '../components/Hero';
import ReviewsCarousel from '../components/ReviewsCarousel';
import Reveal from '../components/Reveal';
import BlogSection from '../components/BlogSection';
import { getSiteSettings, getServices, getProjects, getBlogs, getReviews } from '../utils/api';

// Stacked Scroll Card Component
const StackCard = ({ project, index, total, range, targetScale, progress }) => {
  const cardRef = useRef(null);

  // Use the parent's scroll progress for scaling
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="h-[var(--card-h)] flex items-start md:items-center justify-center sticky top-0 pt-4 md:pt-0"
      style={{
        top: `calc(${index * 25}px)`,
      }}
    >
      <motion.div
        className="w-full max-w-5xl mx-4 rounded-[2rem] overflow-hidden origin-top"
        style={{
          scale,
          // Removed y transform for smoother performance
          background: 'rgba(20, 20, 20, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(108, 99, 255, 0.5)',
          boxShadow: '0 0 20px rgba(108, 99, 255, 0.2), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          willChange: 'transform' // Hint for hardware acceleration
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative h-64 lg:h-[450px] overflow-hidden group">
            {/* Blurred Background */}
            <div className="absolute inset-0">
              <img
                src={project.images?.[0]?.url || 'https://placehold.co/800x600/1A73E8/white?text=Project'}
                alt=""
                className="w-full h-full object-cover blur-md opacity-60 scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-jetBlack/90 to-transparent z-10"></div>
            <img
              src={project.images?.[0]?.url || 'https://placehold.co/800x600/1A73E8/white?text=Project'}
              alt={project.title}
              className="relative z-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="text-neonAqua font-bold text-sm tracking-widest mb-3 uppercase neon-text">
              PROJECT {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-pureWhite mb-4">{project.title}</h3>
            <p className="text-softGrey mb-6 line-clamp-3">{project.shortDesc}</p>
            {project.tech?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <span key={i} className="px-3 py-1 text-neonAqua text-sm rounded-full border border-neonAqua/30 bg-neonAqua/10">
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <Link to={`/projects/${project.slug}`} className="neon-button px-6 py-3 rounded-full font-bold w-fit">
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Stacked Cards Container
const StackedCards = ({ items }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} style={{ height: `calc(${items.length} * var(--card-h))` }} className="relative [--card-h:85vh] md:[--card-h:100vh]">
      {items.map((project, index) => {
        const targetScale = 1 - ((items.length - index) * 0.05);
        const range = [index * (1 / items.length), 1];

        return (
          <StackCard
            key={project._id}
            project={project}
            index={index}
            total={items.length}
            range={range}
            targetScale={targetScale}
            progress={scrollYProgress}
          />
        );
      })}
    </div>
  );
};

// Default Stats Data
// Icon Mapping
const ICON_MAP = {
  'FaRocket': <FaRocket />,
  'FaUsers': <FaUsers />,
  'FaClock': <FaClock />,
  'FaHeart': <FaHeart />
};

// Default Stats Data
const DEFAULT_STATS = [
  { number: 50, label: 'Projects Completed', suffix: '+', icon: 'FaRocket' },
  { number: 30, label: 'Happy Clients', suffix: '+', icon: 'FaUsers' },
  { number: 5, label: 'Years Experience', suffix: '+', icon: 'FaClock' },
  { number: 100, label: 'Client Satisfaction', suffix: '%', icon: 'FaHeart' }
];

// Flipping Stats Component


// Scroll-Linked Service Card with Spring Smoothing
const ServiceCard = ({ service, index, direction, parentScrollProgress }) => {
  // Stagger effect: adjust start/end of animation based on index
  // Range [0, 1] covers the scroll distance of the container
  const start = index * 0.1;
  const end = 0.5 + (index * 0.1);

  const xStart = direction === 'left' ? -100 : 100;

  // Map scroll progress to X position and Opacity
  const rawX = useTransform(parentScrollProgress, [start, end], [xStart, 0]);
  const rawOpacity = useTransform(parentScrollProgress, [start, end], [0, 1]);

  // Add spring physics for smooth "trendy" feel
  const x = useSpring(rawX, { stiffness: 100, damping: 20, mass: 0.5 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 20 });

  return (
    <motion.div style={{ x, opacity }} className="group relative">
      <div className="relative flex flex-col md:flex-row items-start md:items-center p-3 md:p-8 border-b border-white/10 hover:border-neonAqua/50 transition-colors duration-500 bg-gradient-to-r from-transparent via-transparent to-transparent hover:via-white/5 rounded-xl">
        {/* Large Number */}
        <div className="text-3xl md:text-6xl font-black text-white/5 group-hover:text-neonAqua/20 transition-colors duration-500 mr-2 md:mr-6 font-mono">
          {String(index + (direction === 'right' ? 4 : 1)).padStart(2, '0')}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center mb-1 md:mb-2">
            <h3 className="text-sm md:text-2xl font-bold text-pureWhite group-hover:text-neonAqua transition-colors duration-300">
              {service.title}
            </h3>
          </div>
          <p className="text-[10px] md:text-base text-softGrey leading-relaxed group-hover:text-white transition-colors duration-300 line-clamp-2">
            {service.description || "We provide top-notch services to help your business grow."}
          </p>
        </div>

        {/* Arrow Button */}
        <div className="mt-4 md:mt-0 md:ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <Link
            to={`/services#${service.slug}`}
            className="w-10 h-10 rounded-full border border-neonAqua flex items-center justify-center text-neonAqua hover:bg-neonAqua hover:text-jetBlack transition-all duration-300"
          >
            <span className="text-lg">↗</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reviews, setReviews] = useState({ reviews: [], stats: { total: 0, averageRating: 0 } });
  const [category, setCategory] = useState('All');

  const categories = [
    { name: 'All', value: 'All' },
    { name: 'Web Dev', value: 'Web Development' },
    { name: 'App Dev', value: 'Mobile App' },
    { name: 'UI/UX', value: 'UI/UX Design' },
    { name: 'Graphic', value: 'Graphic Design' }
  ];

  const servicesRef = useRef(null);
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "center center"]
  });

  useEffect(() => {
    getSiteSettings().then(res => setSettings(res.data)).catch(console.error);
    getServices().then(res => setServices(res.data.slice(0, 6))).catch(console.error);
    getProjects(1, 6, category).then(res => setProjects(res.data.projects)).catch(console.error);
    getBlogs(1, 3).then(res => setBlogs(res.data.blogs)).catch(console.error);
    getReviews().then(res => setReviews(res.data)).catch(console.error);
  }, [category]);

  return (
    <>
      <Helmet>
        <title>DeployPrime - Turn Your Ideas Into Reality</title>
        <meta name="description" content="Professional web and mobile development services. We build digital products that make a difference." />
      </Helmet>

      <Hero settings={settings} />

      {/* Global Fixed Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-jetBlack"></div>
        <motion.div
          animate={{ y: [0, -50, 0], x: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-softPurple rounded-full blur-[120px] opacity-10"
        ></motion.div>
        <motion.div
          animate={{ y: [0, 50, 0], x: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-neonAqua rounded-full blur-[120px] opacity-10"
        ></motion.div>
      </div>

      {/* About Preview */}
      <section className="pt-8 pb-12 md:pb-20 relative overflow-hidden z-10">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-jetBlack/50 pointer-events-none"></div>
        {/* Neon Glow Circles */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-48 h-48 bg-softPurple rounded-full blur-[80px] opacity-10"
        ></motion.div>
        <motion.div
          animate={{
            y: [0, 50, 0],
            x: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-neonAqua rounded-full blur-[80px] opacity-10"
        ></motion.div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    staggerChildren: 0.2
                  }
                }
              }}
              className="flex flex-col"
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-pureWhite mb-2 inline-block pb-2 border-b-2 border-neonAqua w-fit"
              >
                {settings?.about?.title || 'About Us'}
              </motion.h2>
              <motion.p
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="text-sm sm:text-base md:text-lg text-softGrey mt-4 md:mt-6 leading-relaxed font-medium"
              >
                {settings?.about?.subtitle || 'We turn your ideas into powerful digital products. With expertise in web development, mobile apps, and UI/UX design, we deliver solutions that drive results.'}
              </motion.p>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="mt-6 md:mt-8"
              >
                <Link
                  to="/about-us"
                  className="neon-button inline-block px-4 py-2 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-base font-semibold"
                >
                  Read More
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Counting Stats (Vertical Stack) */}
            {/* Right - Counting Stats (Horizontal Row) */}
            <div className="w-full lg:w-auto mt-8 lg:mt-0">
              <div className="grid grid-cols-4 gap-0.5 md:gap-8 w-full">
                {((settings?.stats && settings.stats.length > 0) ? settings.stats : DEFAULT_STATS).map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                    className="text-center p-0.5 md:p-4 transition-colors"
                  >
                    <div className="mb-0.5 md:mb-2 flex justify-center text-neonAqua text-sm md:text-2xl">
                      {ICON_MAP[stat.icon] || ICON_MAP['FaRocket']}
                    </div>
                    <div className="mb-0.5 md:mb-1">
                      <AnimatedCounter
                        end={stat.number}
                        duration={2.5}
                        suffix={stat.suffix || ''}
                        prefix={stat.prefix || ''}
                        className="text-lg md:text-3xl font-bold text-neonAqua neon-text"
                      />
                    </div>
                    <div className="text-softGrey text-sm md:text-base font-medium uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects - Stacked Cards */}
      {/* Projects - Stacked Cards */}
      <section className="py-12 md:py-20 relative z-10">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-jetBlack/50 pointer-events-none"></div>
        {/* Background Elements Container - Handles overflow without breaking sticky */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Neon Glow Circles */}
          <motion.div
            animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-40 w-[200px] h-[200px] bg-neonAqua rounded-full blur-[100px] opacity-10"
          ></motion.div>
          <motion.div
            animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 right-40 w-[200px] h-[200px] bg-softPurple rounded-full blur-[100px] opacity-10"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-left max-w-2xl"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-pureWhite mb-4 inline-block relative">
                Our Recent Works
                <span className="absolute -bottom-2 left-0 w-1/3 h-1.5 bg-neonAqua rounded-full"></span>
              </h2>
              <p className="text-lg text-softGrey">
                A curated selection of our most impactful digital products.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-start md:justify-end"
            >
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${category === cat.value
                    ? 'bg-neonAqua text-jetBlack border-neonAqua shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                    : 'bg-transparent text-softGrey border-white/10 hover:border-neonAqua hover:text-neonAqua'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          </div>



          {/* Stacked Scroll Cards or Empty State */}
          {projects.length > 0 ? (
            <StackedCards items={projects} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
            >
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold text-pureWhite mb-3">Ready for Takeoff!</h3>
              <p className="text-softGrey max-w-lg mx-auto mb-8">
                We haven't published any projects in this category yet, but we're ready to build something amazing with you. Be the first!
              </p>
              <Link
                to="/contact"
                className="neon-button inline-block px-8 py-3 rounded-lg font-semibold"
              >
                Start Your Project
              </Link>
            </motion.div>
          )}

          <div className="text-center -mt-12 md:mt-10 relative z-20">
            <Link
              to="/projects"
              className="neon-button inline-block px-10 py-4 rounded-xl font-semibold text-lg"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section >

      {/* Services - Spotlight Effect */}
      < section id="services" className="py-16 md:py-24 relative overflow-hidden z-10" >
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pureWhite to-softGrey mb-6">Our Expertise</h2>
            <p className="text-xl text-softGrey max-w-2xl mx-auto">
              Cutting-edge solutions tailored to elevate your digital presence.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 md:gap-12">
            {/* Left Column */}
            <div className="flex flex-col space-y-4 md:space-y-8">
              {services.slice(0, 3).map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                  direction="left"
                  parentScrollProgress={servicesScrollProgress}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-4 md:space-y-8">
              {services.slice(3, 6).map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                  direction="right"
                  parentScrollProgress={servicesScrollProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* Reviews Section */}
      {/* Reviews Section */}
      < section className="py-20 relative overflow-hidden z-10" >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonAqua rounded-full blur-[120px] pointer-events-none opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-pureWhite mb-6">Client Reviews</h2>
            <p className="text-xl text-softGrey max-w-2xl mx-auto">
              See what our clients have to say about their experience working with us.
            </p>
          </motion.div>

          <ReviewsCarousel reviews={reviews.reviews} stats={reviews.stats} />

          <div className="text-center mt-12 relative z-20">
            <p className="text-softGrey mb-4">Have you worked with us? We'd love to hear your feedback!</p>
            <Link
              to="/client/register"
              className="neon-button inline-block px-8 py-3 rounded-lg font-semibold text-base hover:bg-neonAqua/20"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </section >

      {/* Blog Section */}
      {/* Blog Section */}
      {/* Blog Section */}
      <BlogSection />

    </>
  );
};

export default Home;
