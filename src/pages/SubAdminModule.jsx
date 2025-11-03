import React, { useEffect, useState } from "react";
import { FiUserPlus, FiTrash2, FiEdit } from "react-icons/fi";

const API_BASE = "https://law-firm-backend-e082.onrender.com";

function SubAdminForm({ onSubmit, onCancel, existingData }) {
  const [form, setForm] = useState(
    existingData || {
      name: "",
      email: "",
      password: "",
      canManageEnquiries: false,
      canManageLawyers: false,
      canManageServices: false,
      canManagePosts: false,
      canManageNews: false,
      canManageSettings: false,
    }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.name) {
      setError("Name and Email are required.");
      return;
    }
    setError("");
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border p-2 rounded"
        disabled={!!existingData} // Disable email edit
      />

      {!existingData && (
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
      )}

      <div className="grid grid-cols-2 gap-2 border p-3 rounded bg-gray-50">
        {[
          "canManageEnquiries",
          "canManageLawyers",
          "canManageServices",
          "canManagePosts",
          "canManageNews",
          "canManageSettings",
        ].map((field) => (
          <label key={field} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
              className="accent-[#cfac33]"
            />
            <span>{field.replace("canManage", "Manage ")}</span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#cfac33] text-white px-4 py-2 rounded hover:bg-[#b8932b]"
        >
          {existingData ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}

function SubAdminModule() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Use correct token from login page
  const token =
     localStorage.getItem("adminToken");

  const fetchSubAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/subadmin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) setSubAdmins(data.data);
    } catch (err) {
      console.error("Error fetching subadmins:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  // ✅ Create or Update
  const handleSubmit = async (formData) => {
    try {
      const endpoint = editData
        ? `${API_BASE}/api/subadmin/${editData.id}`
        : `${API_BASE}/api/subadmin/create`;

      const method = editData ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowForm(false);
        setEditData(null);
        fetchSubAdmins();
      } else {
        console.error("Error:", data.error);
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this SubAdmin?"))
      return;
    try {
      await fetch(`${API_BASE}/api/subadmin/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubAdmins();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (subAdmin) => {
    setEditData(subAdmin);
    setShowForm(true);
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#23293a] border-b-2 border-[#cfac33] pb-2">
          SubAdmin Management
        </h2>
        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-[#cfac33] text-white px-5 py-2 rounded hover:bg-[#b8932b] flex items-center gap-2"
        >
          <FiUserPlus /> Add SubAdmin
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-[#23293a] mb-4 text-center">
              {editData ? "Edit SubAdmin" : "Create New SubAdmin"}
            </h3>
            <SubAdminForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditData(null);
              }}
              existingData={editData}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : subAdmins.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-[#23293a] text-white text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Permissions</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subAdmins.map((s, i) => (
                <tr
                  key={s.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-[#f8f6f2]"
                  } hover:bg-[#ede9dd]`}
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {Object.entries(s)
                      .filter(([k, v]) => k.startsWith("canManage") && v)
                      .map(([k]) => k.replace("canManage", ""))
                      .join(", ") || "No Permissions"}
                  </td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                    >
                      <FiEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No SubAdmins found.</p>
      )}
    </div>
  );
}

export default SubAdminModule;
