import React, { useEffect, useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const API_BASE = 'https://api.guptalawoffices.in';

// ---------- Post Form ----------
function PostForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    title: '',
    slug: '',
    content: '',
    image: null,
    imagePreview: initialData?.imageUrl || ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        imagePreview: initialData.imageUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (file) => {
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.content) {
      setError('All fields are required.');
      return;
    }
    setError('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('slug', form.slug);
    formData.append('content', form.content);
    if (form.image instanceof File) formData.append('image', form.image);

    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Slug"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="w-full border p-2 rounded h-32 resize-none overflow-y-auto"
        required
      />
      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {form.imagePreview && (
          <div className="mt-2">
            <img
              src={form.imagePreview}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-center">
        <button type="submit" className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition">
          {initialData ? 'Update' : 'Create'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-200 px-5 py-2 rounded font-medium hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// ---------- Posts Module ----------
function PostsModule() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("subAdminToken");

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setPosts(data.data);
      else setPosts([]);
    } catch (err) {
      console.error(err);
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/subadmin/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) { setShowModal(false); fetchPosts(); } 
      else alert(data.message || 'Failed to create post');
    } catch (err) {
      console.error('Create post error:', err);
    }
  };

  const handleUpdate = async (formData) => {
    if (!editing?.id) return;
    try {
      const res = await fetch(`${API_BASE}/api/subadmin/posts/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) { setEditing(null); setShowModal(false); fetchPosts(); } 
      else alert(data.message || 'Failed to update post');
    } catch (err) {
      console.error('Update post error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/subadmin/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchPosts();
      else alert(data.message || 'Failed to delete post');
    } catch (err) {
      console.error('Delete post error:', err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">Blogs & Articles Management</h2>
        <button
          className="bg-[#cfac33] text-white px-4 py-2 rounded"
          onClick={() => { setShowModal(true); setEditing(null); }}
        >
          Add Post
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-[#23293a] mb-4 text-center">
              {editing ? 'Edit Post' : 'Add New Post'}
            </h3>
            <PostForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initialData={editing}
              onCancel={() => { setShowModal(false); setEditing(null); }}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-2"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#23293a] text-white">
                <th className="p-2 font-semibold text-left">Title</th>
                <th className="p-2 font-semibold text-left">Slug</th>
                <th className="p-2 font-semibold text-left">Content</th>
                <th className="p-2 font-semibold text-left">Image</th>
                <th className="p-2 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
  {[...posts].reverse().map((item, index) => (
    <tr
      key={item.id}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}
    >
      <td className="p-2 border">{item.title}</td>
      <td className="p-2 border">{item.slug}</td>
      <td className="p-2 border text-left">
        <div
          className="text-sm text-gray-700 px-1 max-h-[3em] overflow-y-auto"
          style={{ lineHeight: '1.5' }}
        >
          {item.content}
        </div>
      </td>
      <td className="p-2 border text-center">
        {item.imageUrl
          ? <img src={`${API_BASE}${item.imageUrl}`} alt="" className="w-12 h-12 object-cover rounded-full mx-auto" />
          : 'N/A'}
      </td>
      <td className="p-2 border flex justify-center items-center gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
          onClick={() => { setEditing(item); setShowModal(true); }}
        >
          <FiEdit2 /> Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
          onClick={() => handleDelete(item.id)}
        >
          <FiTrash2 /> Delete
        </button>
      </td>
    </tr>
  ))}
  {posts.length === 0 && (
    <tr>
      <td colSpan="5" className="text-center p-4 text-[#cfac33]">
        No posts found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
}

export default PostsModule;
