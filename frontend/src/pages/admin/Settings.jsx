import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { getSiteSettings, updateSiteSettings, uploadImage } from '../../utils/api';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    logoUrl: '',
    socialLinks: {},
    hero: {},
    footer: {},
    whatsappNumber: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getSiteSettings()
      .then(res => {
        setSettings(res.data);
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
      setMessage('Settings updated successfully!');
    } catch (err) {
      setMessage('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-jetBlack flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-xl text-softGrey">Loading settings...</p>
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
            <h1 className="text-2xl font-bold text-neonAqua">Site Settings</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo Settings */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Logo & Branding</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Upload Logo from Device
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                      try {
                        const res = await uploadImage(file);
                        setSettings({ ...settings, logoUrl: res.data.url });
                        setMessage('Logo uploaded successfully!');
                      } catch (err) {
                        setMessage('Failed to upload logo');
                        console.error(err);
                      }
                    }
                  }}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neonAqua file:text-jetBlack file:font-semibold"
                />
                <p className="text-sm text-softGrey mt-1">Or paste URL below if you already have one</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Logo URL (Optional)
                </label>
                <input
                  type="text"
                  value={settings.logoUrl || ''}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {settings.logoUrl && (
                <div className="mt-4 p-4 bg-charcoal rounded-lg border border-white/10">
                  <p className="text-sm font-medium text-pureWhite mb-2">Preview:</p>
                  <img src={settings.logoUrl} alt="Logo" className="h-16 object-contain bg-jetBlack p-2 rounded" />
                </div>
              )}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Social Media Links</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.facebook || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Instagram URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinks?.linkedin || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>

          {/* Hero Settings */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Hero Section</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Headline
                </label>
                <input
                  type="text"
                  value={settings.hero?.headline || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, headline: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Turn your ideas into reality"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Sub Text
                </label>
                <input
                  type="text"
                  value={settings.hero?.subText || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, subText: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="We build digital products that make a difference"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Typed Words (comma separated)
                </label>
                <input
                  type="text"
                  value={settings.hero?.typedWords?.join(', ') || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    hero: { ...settings.hero, typedWords: e.target.value.split(',').map(w => w.trim()) }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Web Dev, App Dev, UI Design"
                />
              </div>
            </div>
          </div>

          {/* Contact Settings */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="+1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phoneNumber || ''}
                  onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="+1234567890"
                />
              </div>
            </div>
          </div>

          {/* About Us Section */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">About Us Page Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={settings.about?.title || ''}
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
                  value={settings.about?.subtitle || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, subtitle: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="We turn your ideas into powerful digital products."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={settings.about?.mainHeading || ''}
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
                  rows="3"
                  value={settings.about?.description1 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, description1: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="DeployPrime is a freelance agency specializing in..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Description Paragraph 2
                </label>
                <textarea
                  rows="3"
                  value={settings.about?.description2 || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, description2: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Our team combines technical expertise..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  About Image URL
                </label>
                <input
                  type="text"
                  value={settings.about?.imageUrl || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, imageUrl: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="https://example.com/about-image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Features/Benefits (comma separated)
                </label>
                <textarea
                  rows="3"
                  value={settings.about?.features?.join(', ') || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    about: { ...settings.about, features: e.target.value.split(',').map(f => f.trim()) }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Expert team with years of experience, Client-focused approach, Modern technologies"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Statistics (About Page & Home)</h2>
            <p className="text-sm text-softGrey mb-4">These numbers will show on About and Home pages</p>
            
            <div className="space-y-4">
              {(settings.stats || [
                { number: 50, label: 'Projects Completed', suffix: '+', prefix: '' },
                { number: 30, label: 'Happy Clients', suffix: '+', prefix: '' },
                { number: 5, label: 'Years Experience', suffix: '+', prefix: '' },
                { number: 100, label: 'Client Satisfaction', suffix: '%', prefix: '' }
              ]).map((stat, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-charcoal rounded-lg border border-white/10">
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Number</label>
                    <input
                      type="number"
                      value={stat.number}
                      onChange={(e) => {
                        const newStats = [...(settings.stats || [])];
                        newStats[index] = { ...newStats[index], number: parseFloat(e.target.value) || 0 };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...(settings.stats || [])];
                        newStats[index] = { ...newStats[index], label: e.target.value };
                        setSettings({ ...settings, stats: newStats });
                      }}
                      className="w-full px-3 py-2 bg-jetBlack border border-neonAqua/30 rounded-lg text-sm text-pureWhite"
                      placeholder="Projects Completed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neonAqua mb-1">Prefix</label>
                    <input
                      type="text"
                      value={stat.prefix || ''}
                      onChange={(e) => {
                        const newStats = [...(settings.stats || [])];
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
                        const newStats = [...(settings.stats || [])];
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

          {/* Footer Settings */}
          <div className="glass-card rounded-2xl p-6 border border-neonAqua/20">
            <h2 className="text-2xl font-bold text-neonAqua mb-6">Footer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Company Brief
                </label>
                <textarea
                  rows="3"
                  value={settings.footer?.companyBrief || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    footer: { ...settings.footer, companyBrief: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="We are a digital agency specializing in web and mobile development..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.footer?.email || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    footer: { ...settings.footer, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="contact@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={settings.footer?.location || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    footer: { ...settings.footer, location: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="New York, USA"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pureWhite mb-2">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={settings.footer?.workingHours || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    footer: { ...settings.footer, workingHours: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg text-pureWhite placeholder-softGrey/50"
                  placeholder="Mon - Fri: 9AM - 6PM"
                />
              </div>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg border ${
              message.includes('success') ? 'bg-green-900/30 text-green-400 border-green-500/30' : 'bg-red-900/30 text-red-400 border-red-500/30'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-8 py-4 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 transition-colors disabled:opacity-50"
          >
            <FaSave />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
