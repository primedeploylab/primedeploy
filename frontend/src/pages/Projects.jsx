import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { getProjects } from '../utils/api';
import Reveal from '../components/Reveal';

import PageWrapper from '../components/PageWrapper';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('All');

  const categories = [
    { name: 'All', value: 'All' },
    { name: 'Web Dev', value: 'Web Development' },
    { name: 'App Dev', value: 'Mobile App' },
    { name: 'UI/UX Design', value: 'UI/UX Design' },
    { name: 'Graphic Design', value: 'Graphic Design' }
  ];

  useEffect(() => {
    getProjects(page, 9, category)
      .then(res => {
        setProjects(res.data.projects);
        setPagination(res.data.pagination);
      })
      .catch(err => console.error(err));
  }, [page, category]);

  return (
    <PageWrapper>
      <Helmet>
        <title>Our Projects - DeployPrime</title>
        <meta name="description" content="Explore our portfolio of web and mobile development projects." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Reveal width="100%">
              <h1 className="text-5xl font-bold text-pureWhite mb-6">Our Projects</h1>
            </Reveal>
            <Reveal width="100%" delay={0.3}>
              <p className="text-2xl text-softGrey max-w-3xl mx-auto">
                Showcasing our best work and successful collaborations
              </p>
            </Reveal>
          </div>

          {/* Filter Buttons */}
          <Reveal width="100%" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => {
                    setCategory(cat.value);
                    setPage(1);
                  }}
                  className={`px-6 py-2 rounded-full border transition-all duration-300 ${category === cat.value
                    ? 'bg-neonAqua text-jetBlack border-neonAqua font-bold shadow-[0_0_15px_rgba(0,255,255,0.5)]'
                    : 'bg-transparent text-softGrey border-softGrey/30 hover:border-neonAqua hover:text-neonAqua'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Reveal key={project._id} delay={index * 0.1}>
                <div className="group glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-neonAqua/20 transition-all border border-neonAqua/30 h-full">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={project.images[0]?.url || 'https://via.placeholder.com/800x600'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-jetBlack/0 group-hover:bg-jetBlack/70 transition-all flex items-center justify-center">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold transition-opacity"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-pureWhite mb-2">{project.title}</h3>
                    <p className="text-softGrey mb-4">{project.shortDesc}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-jetBlack/50 border border-neonAqua/30 text-neonAqua text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.timeTaken && (
                      <p className="text-sm text-softGrey">⏱️ {project.timeTaken}</p>
                    )}
                  </div>
                </div>
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
                    : 'bg-charcoal border border-neonAqua/30 text-pureWhite hover:bg-neonAqua/10'
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

export default Projects;
