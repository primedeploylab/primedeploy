import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes } from 'react-icons/fa';
import { getAdminServices, createService, updateService, deleteService } from '../../utils/api';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDesc: '',
    details: '',
    deliverables: [],
    icon: '',
    order: 0,
    published: true
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = () => {
    getAdminServices()
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      shortDesc: '',
      details: '',
      deliverables: [],
      icon: '',
      order: 0,
      published: true
    });
    setEditingService(null);
    setShowForm(false);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || '',
      slug: service.slug || '',
      shortDesc: service.shortDesc || '',
      details: service.details || '',
      deliverables: service.deliverables || [],
      icon: service.icon || '',
      order: service.order || 0,
      published: service.published !== undefined ? service.published : true
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingService) {
        await updateService(editingService._id, formData);
        alert('Service updated successfully!');
      } else {
        await createService(formData);
        alert('Service created successfully!');
      }
      loadServices();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        loadServices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-jetBlack">
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-pureWhite hover:text-neonAqua transition-colors">
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-neonAqua">Manage Services</h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 transition-colors font-semibold"
          >
            <FaPlus />
            <span>Add Service</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Edit/Create Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-charcoal rounded-2xl p-8 max-w-2xl w-full my-8 border border-neonAqua/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neonAqua">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h2>
                <button onClick={resetForm} className="text-softGrey hover:text-pureWhite transition-colors">
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setFormData({ 
                          ...formData, 
                          title,
                          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        });
                      }}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="Web Development"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="web-development"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Short Description *
                  </label>
                  <textarea
                    required
                    rows="2"
                    value={formData.shortDesc}
                    onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Details *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="Detailed description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Deliverables (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.deliverables.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      deliverables: e.target.value.split(',').map(d => d.trim()).filter(d => d)
                    })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="Responsive Design, SEO, Performance"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Icon (emoji) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite text-3xl"
                      placeholder="🌐"
                      maxLength="2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 accent-neonAqua"
                  />
                  <label htmlFor="published" className="text-pureWhite font-semibold">
                    Publish this service
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-white/10 text-pureWhite rounded-lg font-semibold hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service._id} className="glass-card rounded-2xl p-6 border border-neonAqua/20 hover:border-neonAqua/40 transition-all">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-pureWhite mb-2">{service.title}</h3>
              <p className="text-softGrey mb-4 line-clamp-2">{service.shortDesc}</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  service.published ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-white/10 text-softGrey'
                }`}>
                  {service.published ? 'Published' : 'Draft'}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 text-neonAqua hover:bg-neonAqua/10 rounded-lg transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-softGrey text-xl">No services yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
