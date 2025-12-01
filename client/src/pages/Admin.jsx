import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Image as ImageIcon, Plus, X, Filter } from 'lucide-react';

const Admin = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    section: 'gallery',
    category: '',
    image: null
  });

  const sections = [
    { id: 'all', name: 'All Images' },
    { id: 'hero', name: 'Hero Carousel' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'about', name: 'About Page' },
    { id: 'services', name: 'Services' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'instagram', name: 'Instagram Feed' }
  ];

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  const fetchImages = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/hero-images`; // We reused the route path but it handles all images now
      if (activeSection !== 'all') {
        url += `?section=${activeSection}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [activeSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.image) return;

    setUploading(true);
    setUploadStatus(null);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('description', formData.description);
    data.append('section', formData.section);
    data.append('category', formData.category);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hero-images/upload`, {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setUploadStatus({ type: 'success', message: 'Image uploaded successfully!' });
        setFormData({
          title: '',
          subtitle: '',
          description: '',
          section: 'gallery',
          category: '',
          image: null
        });
        setShowUploadModal(false);
        fetchImages();
      } else {
        setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({ type: 'error', message: 'Network error.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/hero-images/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4 md:mb-0">
            Admin Dashboard
          </h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Upload New Image</span>
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-gold text-black'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {section.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No images found in this section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map(image => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <img
                    src={image.image}
                    alt={image.title || 'Site image'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(image.id);
                      }}
                      className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      title="Delete Image"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs font-bold bg-black/70 text-white rounded uppercase">
                      {image.section}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">
                    {image.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {image.subtitle || 'No subtitle'}
                  </p>
                  {image.category && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                      {image.category}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-xl font-serif font-bold">Upload Image</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-gold focus:border-gold"
                  >
                    {sections.filter(s => s.id !== 'all').map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-gold focus:border-gold mb-2"
                  >
                    <option value="">Select a category...</option>
                    <option value="wedding">Wedding</option>
                    <option value="portraits">Portraits</option>
                    <option value="events">Events</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md focus:ring-gold focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-gold transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : 'Click to select image'}
                      </span>
                    </label>
                  </div>
                </div>

                {uploadStatus && (
                  <div className={`p-3 rounded-md text-sm ${
                    uploadStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {uploadStatus.message}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={uploading || !formData.image}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
