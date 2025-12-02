import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaGlobe, FaGooglePlay, FaAppStore } from 'react-icons/fa';
import { getProject } from '../utils/api';

import PageWrapper from '../components/PageWrapper';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    getProject(slug)
      .then(res => setProject(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!project) {
    return <div className="pt-20 min-h-screen flex items-center justify-center bg-jetBlack text-pureWhite">Loading...</div>;
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{project.title} - DeployPrime</title>
        <meta name="description" content={project.shortDesc} />
      </Helmet>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects" className="text-neonAqua hover:text-pureWhite mb-6 inline-block transition-colors">
            ← Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold text-pureWhite mb-6">{project.title}</h1>
            <p className="text-2xl text-softGrey mb-8">{project.shortDesc}</p>

            {/* Image Gallery */}
            <div className="mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10">
                <img
                  src={project.images[currentImage]?.url || 'https://via.placeholder.com/1200x675'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${currentImage === index ? 'border-neonAqua' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img
                        src={image.url}
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-pureWhite mb-4">About This Project</h2>
                <p className="text-softGrey mb-6 leading-relaxed">{project.description}</p>

                {project.caseStudy && (
                  <>
                    <h3 className="text-2xl font-bold text-pureWhite mb-4">Case Study</h3>
                    <p className="text-softGrey leading-relaxed">{project.caseStudy}</p>
                  </>
                )}
              </div>

              <div>
                <div className="glass-card rounded-2xl p-6 shadow-lg border border-neonAqua/30">
                  <h3 className="text-xl font-bold text-pureWhite mb-4">Project Details</h3>

                  {project.timeTaken && (
                    <div className="mb-4">
                      <p className="text-softGrey text-sm mb-1">Duration</p>
                      <p className="text-pureWhite font-semibold">{project.timeTaken}</p>
                    </div>
                  )}

                  {project.tech && project.tech.length > 0 && (
                    <div className="mb-4">
                      <p className="text-softGrey text-sm mb-2">Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-jetBlack/50 border border-neonAqua/30 text-neonAqua text-sm rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 mt-6">
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 transition-colors font-bold"
                      >
                        <FaGlobe />
                        <span>Visit Website</span>
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white/10 border border-white/20 text-pureWhite rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <FaGooglePlay />
                        <span>Play Store</span>
                      </a>
                    )}
                    {project.appStoreUrl && (
                      <a
                        href={project.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-white/10 border border-white/20 text-pureWhite rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <FaAppStore />
                        <span>App Store</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default ProjectDetail;
