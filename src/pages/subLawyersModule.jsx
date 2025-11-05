import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import ImageUploader from '../components/ImageUploader';

const API_BASE = 'https://api.guptalawoffices.in';

const SERVICE_OPTIONS = [
  { id: 'law1', name: 'Criminal Law' },
  { id: 'law2', name: 'Family Law' },
  { id: 'law3', name: 'Corporate Law' },
  { id: 'law4', name: 'Intellectual Property' },
  { id: 'law5', name: 'Civil Litigation' },
  { id: 'law6', name: 'Employment Law' },
  { id: 'law7', name: 'Real Estate Law' },
  { id: 'law8', name: 'Tax Law' },
  { id: 'law9', name: 'Immigration Law' },
  { id: 'law10', name: 'Constitutional Law' },
];

function LawyerForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState(initialData || {
    name: '',
    specialization: '',
    experience: '',
    image: null,
    imagePreview: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (!form.name || !form.specialization || !form.experience) {
      setError('All fields are required.');
      return;
    }

    if (!form.image && !initialData) {
      setError('Please upload an image.');
      return;
    }

    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('title', form.specialization);
    formData.append('bio', form.experience);

    if (form.image instanceof File) formData.append('image', form.image);

    onSubmit(formData);
  };

  const handleImageUpload = (file) => {
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="specialization"
        value={form.specialization}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="experience"
        value={form.experience}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      >
        <option value="">Select Service</option>
        {SERVICE_OPTIONS.map(service => (
          <option key={service.id} value={service.name}>
            {service.name}
          </option>
        ))}
      </select>

      <div>
        <ImageUploader onUpload={handleImageUpload} />
        {(form.imagePreview || form.imageUrl) && (
          <div className="mt-2">
            <img
              src={form.imagePreview || `${API_BASE}${form.imageUrl}`}
              alt="Uploaded"
              className="w-20 h-20 object-cover rounded-full border mx-auto"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition"
        >
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

function LawyersModule() {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("subAdminToken");

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/lawyers`);
      const data = await res.json();
      if (Array.isArray(data.data)) setLawyers(data.data);
      else if (Array.isArray(data)) setLawyers(data);
      else setLawyers([]);
    } catch (err) {
      console.error(err);
      setLawyers([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchLawyers(); }, []);

  const handleCreate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/subadmin/lawyers`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create lawyer');
      setShowForm(false);
      fetchLawyers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(`${API_BASE}/api/subadmin/lawyers/${editing.id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update lawyer');
      setEditing(null);
      setShowForm(false);
      fetchLawyers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lawyer?')) return;
    try {
      await fetch(`${API_BASE}/api/subadmin/lawyers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLawyers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-[#ffffff] rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">
          Lawyers Management
        </h2>
        <button
          className="bg-[#cfac33] text-white px-5 py-2 rounded font-medium hover:bg-[#b8932b] transition"
          onClick={() => { setShowForm(true); setEditing(null); }}
        >
          Add Lawyer
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => { setShowForm(false); setEditing(null); }}
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-[#23293a] mb-4 text-center">
              {editing ? 'Edit Lawyer' : 'Add New Lawyer'}
            </h3>
            <LawyerForm
              onSubmit={editing ? handleUpdate : handleCreate}
              initialData={editing}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
  <thead>
    <tr className="bg-[#23293a] text-white">
      <th className="p-1.5 font-semibold text-left">Name</th>
      <th className="p-1.5 font-semibold text-left">Title</th>
      <th className="p-1.5 font-semibold text-left">Service Description</th>
      <th className="p-1.5 font-semibold text-left">Image</th>
      <th className="p-1.5 font-semibold text-center">Actions</th>
    </tr>
  </thead>
  <tbody>
    {[...lawyers].reverse().map((lawyer, index) => (
      <tr key={lawyer.id || lawyer._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f3f1eb]'} hover:bg-[#ede9dd] transition`}>
        <td className="p-1.5 border-t">{lawyer.name}</td>
        <td className="p-1.5 border-t">{lawyer.title}</td>
        <td
          className="p-1.5 border-t"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {lawyer.bio}
        </td>
        <td className="p-1.5 border-t text-center">
          {lawyer.imageUrl
            ? <img
                src={`${API_BASE}${lawyer.imageUrl}`}
                alt=""
                className="w-10 h-10 object-cover rounded-full mx-auto"
              />
            : 'N/A'}
        </td>
        <td className="p-1.5 border-t text-center flex justify-center gap-1">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition text-sm"
            onClick={() => { setEditing(lawyer); setShowForm(true); }}
          >
            <FiEdit2 /> Edit
          </button>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition text-sm"
            onClick={() => handleDelete(lawyer.id || lawyer._id)}
          >
            <FiTrash2 /> Delete
          </button>
        </td>
      </tr>
    ))}
    {lawyers.length === 0 && !loading && (
      <tr>
        <td colSpan="5" className="text-center p-2 text-[#bfa77a] font-medium">
          No lawyers found.
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

export default LawyersModule;
