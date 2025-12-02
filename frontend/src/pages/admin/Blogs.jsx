import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaTimes, FaUpload } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, uploadImage } from '../../utils/api';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: [],
    featuredImage: null,
    draft: true
  });

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    getAdminBlogs()
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      tags: [],
      featuredImage: null,
      draft: true
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      author: blog.author || '',
      category: blog.category || '',
      tags: blog.tags || [],
      featuredImage: blog.featuredImage || null,
      draft: blog.draft !== undefined ? blog.draft : true
    });
    setShowForm(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadImage(file);
      setFormData({
        ...formData,
        featuredImage: { url: res.data.url }
      });
    } catch (err) {
      alert('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, formData);
        alert('Blog updated successfully!');
      } else {
        await createBlog(formData);
        alert('Blog created successfully!');
      }
      loadBlogs();
      resetForm();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        loadBlogs();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  return (
    <div className="min-h-screen bg-jetBlack">
      <nav className="bg-charcoal border-b border-white/10 text-pureWhite p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-pureWhite hover:text-neonAqua transition-colors">
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-neonAqua">Manage Blogs</h1>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-neonAqua text-jetBlack rounded-lg hover:bg-neonAqua/80 transition-colors font-semibold"
          >
            <FaPlus />
            <span>Add Blog</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Edit/Create Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-charcoal rounded-2xl p-8 max-w-4xl w-full my-8 border border-neonAqua/30">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-neonAqua">
                  {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <button onClick={resetForm} className="text-softGrey hover:text-pureWhite transition-colors">
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="10 Tips for Better Web Design"
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Excerpt *
                  </label>
                  <textarea
                    required
                    rows="2"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="Brief summary for blog cards..."
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Featured Image *
                  </label>
                  <div className="border-2 border-dashed border-neonAqua/30 rounded-lg p-6 hover:border-neonAqua/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="featured-image"
                    />
                    <label
                      htmlFor="featured-image"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <FaUpload className="text-4xl text-neonAqua mb-2" />
                      <p className="text-softGrey">
                        {uploadingImage ? 'Uploading...' : 'Click to upload featured image'}
                      </p>
                    </label>
                  </div>

                  {formData.featuredImage && (
                    <div className="mt-4">
                      <img
                        src={formData.featuredImage.url}
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg border border-white/10"
                      />
                    </div>
                  )}
                </div>

                {/* Author & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-pureWhite mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite [&>option]:bg-jetBlack"
                    >
                      <option value="">Select Category</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Development">Mobile Development</option>
                      <option value="Design">Design</option>
                      <option value="Technology">Technology</option>
                      <option value="Business">Business</option>
                      <option value="Tutorial">Tutorial</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                    })}
                    className="w-full px-4 py-3 bg-jetBlack border border-neonAqua/30 rounded-lg focus:ring-2 focus:ring-neonAqua focus:border-transparent text-pureWhite placeholder-softGrey/50"
                    placeholder="react, javascript, tutorial"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-semibold text-pureWhite mb-2">
                    Blog Content *
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    modules={quillModules}
                    className="bg-jetBlack rounded-lg text-pureWhite [&_.ql-toolbar]:bg-charcoal [&_.ql-toolbar]:border-neonAqua/30 [&_.ql-container]:border-neonAqua/30"
                    style={{ height: '300px', marginBottom: '50px' }}
                  />
                </div>

                {/* Draft Toggle */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="published"
                    checked={!formData.draft}
                    onChange={(e) => setFormData({ ...formData, draft: !e.target.checked })}
                    className="w-5 h-5 accent-neonAqua"
                  />
                  <label htmlFor="published" className="text-pureWhite font-semibold">
                    Publish this blog
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading || uploadingImage}
                    className="flex-1 px-6 py-3 bg-neonAqua text-jetBlack rounded-lg font-semibold hover:bg-neonAqua/80 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Saving...' : editingBlog ? 'Update Blog' : 'Create Blog'}
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

        {/* Blogs Table */}
        <div className="glass-card rounded-2xl overflow-hidden border border-neonAqua/20">
          <table className="w-full">
            <thead className="bg-charcoal border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Author</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-neonAqua font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-pureWhite font-medium">{blog.title}</td>
                  <td className="px-6 py-4 text-softGrey">{blog.author}</td>
                  <td className="px-6 py-4 text-softGrey">{blog.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      blog.draft ? 'bg-white/10 text-softGrey' : 'bg-green-900/30 text-green-400 border border-green-500/30'
                    }`}>
                      {blog.draft ? 'Draft' : 'Published'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-softGrey">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-neonAqua hover:bg-neonAqua/10 rounded-lg transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-softGrey text-xl">No blogs yet. Create your first one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
