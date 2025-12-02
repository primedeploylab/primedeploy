import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { getSiteSettings, updateSiteSettings, uploadImage } from '../../utils/api';

const AdminAbout = () => {
  const [settings, setSettings] = useState({
    about: {
      title: '',
      subtitle: '',
      mainHeading: '',
      description1: '',
      description2: '',
      imageUrl: '',
      features: [],
      statsHeading: '',
      statsSubheading: ''
    },
    stats: [
      { number: 50, label: 'Projects Completed', suffix: '+', prefix: '' },
      { number: 30, label: 'Happy Clients', suffix: '+', prefix: '' },
      { number: 5, label: 'Years Experience', suffix: '+', prefix: '' },
      { number: 100, label: 'Client Satisfaction', suffix: '%', prefix: '' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        setSettings({
          about: res.data.about || {
            title: 'About Us',
            subtitle: 'We turn your ideas into powerful digital products.',
            mainHeading: 'Building Digital Excellence Since Day One',
            description1: '',
            description2: '',
            imageUrl: '',
            features: []
          },
          stats: res.data.stats?.map((stat, index) => ({
            ...stat,
            icon: stat.icon || ['FaRocket', 'FaUsers', 'FaClock', 'FaHeart'][index] || 'FaRocket'
          })) || [
              { number: 50, label: 'Projects Completed', suffix: '+', prefix: '', icon: 'FaRocket' },
              { number: 30, label: 'Happy Clients', suffix: '+', prefix: '', icon: 'FaUsers' },
              { number: 5, label: 'Years Experience', suffix: '+', prefix: '', icon: 'FaClock' },
              { number: 100, label: 'Client Satisfaction', suffix: '%', prefix: '', icon: 'FaHeart' }
            ]
        });
        setPageLoading(false);
      })
      .catch(err => {
        console.error(err);
        setPageLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateSiteSettings(settings);
      setMessage('About page updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update about page');
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setSettings({
      ...settings,
      about: {
        ...settings.about,
        features: [...(settings.about.features || []), '']
      }
    });
  };

  const removeFeature = (index) => {
    const newFeatures = settings.about.features.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      about: { ...settings.about, features: newFeatures }
    });
  };

  const updateFeature = (index, value) => {
    const newFeatures = [...settings.about.features];
    newFeatures[index] = value;
    setSettings({
      ...settings,
      about: { ...settings.about, features: newFeatures }
    });
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-jetBlack flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-softGrey">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jetBlack">
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-pureWhite hover:text-neonAqua transition-colors">
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-neonAqua">About Us Page</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${message.includes('success') ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hero Section */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Hero Section</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={settings.about.title}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, title: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="About Us"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={settings.about.subtitle}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, subtitle: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="We turn your ideas into powerful digital products."
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Content Section</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        const res = await uploadImage(file);
                        setSettings({
                          ...settings,
                          about: { ...settings.about, imageUrl: res.data.url }
                        });
                        setMessage('Image uploaded successfully!');
                        setTimeout(() => setMessage(''), 3000);
                      } catch (err) {
                        setMessage('Failed to upload image');
                      }
                    }
                  }}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neonAqua file:text-jetBlack file:font-semibold"
                />
                {settings.about.imageUrl && (
                  <div className="mt-4">
                    <img src={settings.about.imageUrl} alt="About" className="h-32 rounded-lg border border-white/10" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={settings.about.mainHeading}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, mainHeading: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Building Digital Excellence Since Day One"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Description Paragraph 1
                </label>
                <textarea
                  rows="4"
                  value={settings.about.description1}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, description1: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="DeployPrime is a freelance agency..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Description Paragraph 2
                </label>
                <textarea
                  rows="4"
                  value={settings.about.description2}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, description2: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Our team combines technical expertise..."
                />
              </div>
            </div>
          </div>

          {/* Features/Benefits */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neonAqua">Features/Benefits</h2>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-2 px-4 py-2 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 font-semibold transition-colors"
              >
                <FaPlus /> Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {settings.about.features?.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                    placeholder="Expert team with years of experience"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-4 py-3 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Statistics Section</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Section Heading
                </label>
                <input
                  type="text"
                  value={settings.about.statsHeading || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, statsHeading: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Our Achievements"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Section Subheading
                </label>
                <input
                  type="text"
                  value={settings.about.statsSubheading || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, statsSubheading: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Numbers that speak for themselves"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-pureWhite mb-4">Stats Numbers</h3>

            <div className="space-y-4">
              {(settings.stats || []).map((stat, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-charcoal rounded-lg border border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Number</label>
                    <input
                      type="number"
                      value={stat.number}
                      onChange={(e) => {
                        const newStats = [...settings.stats];
                        newStats[index] = { ...newStats[index], number: parseFloat(e.target.value) || 0 };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...settings.stats];
                        newStats[index] = { ...newStats[index], label: e.target.value };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Prefix</label>
                    <input
                      type="text"
                      value={stat.prefix || ''}
                      onChange={(e) => {
                        const newStats = [...settings.stats];
                        newStats[index] = { ...newStats[index], prefix: e.target.value };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                      placeholder="$"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Suffix</label>
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => {
                        const newStats = [...settings.stats];
                        newStats[index] = { ...newStats[index], suffix: e.target.value };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                      placeholder="+"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 transition-colors disabled:opacity-50"
            >
              <FaSave />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;
