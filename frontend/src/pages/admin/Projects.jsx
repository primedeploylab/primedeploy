import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaUpload } from 'react-icons/fa';
import { getAdminProjects, createProject, updateProject, deleteProject, uploadImages } from '../../utils/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    shortDesc: '',
    description: '',
    tech: [],
    category: '',
    clientName: '',
    websiteUrl: '',
    githubUrl: '',
    playStoreUrl: '',
    appStoreUrl: '',
    timeTaken: '',
    images: [],
    published: false
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    getAdminProjects()
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      shortDesc: '',
      description: '',
      tech: [],
      category: '',
      clientName: '',
      websiteUrl: '',
      githubUrl: '',
      playStoreUrl: '',
      appStoreUrl: '',
      timeTaken: '',
      images: [],
      published: false
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      shortDesc: project.shortDesc || '',
      description: project.description || '',
      tech: project.tech || [],
      category: project.category || '',
      clientName: project.clientName || '',
      websiteUrl: project.websiteUrl || '',
      githubUrl: project.githubUrl || '',
      playStoreUrl: project.playStoreUrl || '',
      appStoreUrl: project.appStoreUrl || '',
      timeTaken: project.timeTaken || '',
      images: project.images || [],
      published: project.published || false
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    try {
      const res = await uploadImages(files);
      setFormData({
        ...formData,
        images: [...formData.images, ...res.data.images.map(img => ({ url: img.url }))]
      });
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload images');
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProject) {
        await updateProject(editingProject._id, formData);
        alert('Project updated successfully!');
      } else {
        await createProject(formData);
        alert('Project created successfully!');
      }
      loadProjects();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        loadProjects();
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
            <h1 className="text-2xl font-bold text-neonAqua">Manage Projects</h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 transition-colors font-semibold"
          >
            <FaPlus />
            <span>Add Project</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Edit/Create Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="bg-charcoal rounded-2xl p-8 max-w-4xl w-full relative border border-neonAqua/30">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-neonAqua">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <button onClick={resetForm} className="text-softGrey hover:text-pureWhite transition-colors">
                    <FaTimes size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="E-commerce Website"
                    />
                  </div>

                  {/* Short Description */}
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
                      placeholder="Brief description for cards..."
                    />
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Full Description *
                    </label>
                    <textarea
                      required
                      rows="6"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="Detailed project description..."
                    />
                  </div>

                  {/* Category & Client */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite [&>option]:bg-jetBlack"
                      >
                        <option value="">Select Category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        Client Name
                      </label>
                      <input
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                        placeholder="Client or Company Name"
                      />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Technologies (comma separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tech.join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        tech: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                      })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  {/* Time Taken */}
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Time Taken
                    </label>
                    <input
                      type="text"
                      value={formData.timeTaken}
                      onChange={(e) => setFormData({ ...formData, timeTaken: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="3 months"
                    />
                  </div>

                  {/* URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        Website URL
                      </label>
                      <input
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        Play Store URL
                      </label>
                      <input
                        type="url"
                        value={formData.playStoreUrl}
                        onChange={(e) => setFormData({ ...formData, playStoreUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                        placeholder="https://play.google.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-pureWhite mb-2">
                        App Store URL
                      </label>
                      <input
                        type="url"
                        value={formData.appStoreUrl}
                        onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                        className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                        placeholder="https://apps.apple.com/..."
                      />
                    </div>
                  </div>

                  {/* Images Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Project Images *
                    </label>
                    <div className="border-2 border-dashed border-neonAqua/30 rounded-lg p-6 hover:border-neonAqua/50 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <FaUpload className="text-4xl text-neonAqua mb-2" />
                        <p className="text-softGrey">
                          {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                        </p>
                      </label>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {formData.images.map((img, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={img.url}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border border-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Published Toggle */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-5 h-5 accent-neonAqua"
                    />
                    <label htmlFor="published" className="text-pureWhite font-semibold">
                      Publish this project
                    </label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading || uploadingImages}
                      className="flex-1 px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 disabled:opacity-50 transition-colors"
                    >
                      {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
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
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="glass-card rounded-2xl overflow-hidden border border-neonAqua/20 hover:border-neonAqua/40 transition-all">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.images[0]?.url || 'https://via.placeholder.com/800x600'}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pureWhite mb-2">{project.title}</h3>
                <p className="text-softGrey mb-4 line-clamp-2">{project.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm ${project.published ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-white/10 text-softGrey'
                    }`}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-neonAqua hover:bg-neonAqua/10 rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-softGrey text-xl">No projects yet. Create your first one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;
