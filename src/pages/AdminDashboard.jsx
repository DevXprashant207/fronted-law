import { useEffect, useState } from 'react';
import LawyersModule from './LawyersModule';
import EnquiriesModule from './EnquiriesModule';
import MediaModule from './MediaModule';
import NewsModule from './NewsModule';
import PostsModule from './PostsModule';
import ServicesModule from './ServicesModule';
import SubAdminModule from './SubAdminModule';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');

  const [counts, setCounts] = useState({
    news: 0,
    lawyers: 0,
    posts: 0,
    services: 0,
    enquiries: 0
  });

  // 👇 Updated settings with 4 toggles
  const [settings, setSettings] = useState({
    showNews: true,
    showTeam: true,
    showServices: true,
    showBlog: true
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');

    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('adminToken');

        const [newsRes, lawyersRes, postsRes, servicesRes, enquiriesRes, settingsRes] = await Promise.all([
          fetch('https://api.guptalawoffices.in/api/news/').then(res => res.json()),
          fetch('https://api.guptalawoffices.in/api/lawyers').then(res => res.json()),
          fetch('https://api.guptalawoffices.in/api/posts/').then(res => res.json()),
          fetch('https://api.guptalawoffices.in/api/services/').then(res => res.json()),
          fetch('https://api.guptalawoffices.in/api/admin/enquiries?limit=1000', {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(res => res.json()),
          fetch('https://api.guptalawoffices.in/api/settings').then(res => res.json())
        ]);

        setCounts({
          news: newsRes.data?.length || 0,
          lawyers: lawyersRes.data?.length || 0,
          posts: postsRes.data?.length || 0,
          services: servicesRes.data?.length || 0,
          enquiries: Array.isArray(enquiriesRes.data) ? enquiriesRes.data.length : 0
        });

        if (settingsRes) setSettings(settingsRes);
      } catch (error) {
        console.error('Failed to fetch counts or settings:', error);
      }
    };

    fetchCounts();
  }, [navigate]);

  // 👇 Update setting to backend
  const updateSetting = async (field, value) => {
    try {
      const newSettings = { ...settings, [field]: value };
      setSettings(newSettings);

      const token = localStorage.getItem('adminToken');
      await fetch('https://api.guptalawoffices.in/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23293a] text-white flex flex-col py-8 px-4 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-[#cfac33] rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
            </svg>
          </span>
          <span className="font-bold text-lg">Gupta Law Offices</span>
        </div>

        <nav className="flex flex-col gap-4">
          {['dashboard', 'enquiries', 'lawyers', 'services', 'posts', 'news', 'subadmins', 'settings'].map((section) => (
            <button
              key={section}
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === section
                  ? 'bg-[#cfac33] text-white shadow-md'
                  : 'hover:bg-[#cfac33] hover:text-white'
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section === 'posts'
                ? 'Blogs & Articles'
                : section === 'subadmins'
                ? 'Sub Admins'
                : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </nav>

        <button
          className="mt-auto px-4 py-2 rounded bg-[#cfac33] text-white font-semibold hover:bg-[#b8982b] transition"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/admin/login');
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gradient-to-b from-[#ffffff] to-[#ffffff] shadow-inner rounded-tl-3xl transition-all">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 border-b pb-2">
          {activeSection === 'settings' ? 'Site Settings' : 'Admin Dashboard'}
        </h1>

        {/* Dashboard Overview */}
        {activeSection === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { label: 'News', value: counts.news, key: 'news' },
                { label: 'Lawyers', value: counts.lawyers, key: 'lawyers' },
                { label: 'Posts', value: counts.posts, key: 'posts' },
                { label: 'Services', value: counts.services, key: 'services' },
                { label: 'Enquiries', value: counts.enquiries, key: 'enquiries' }
              ].map(({ label, value, key }) => (
                <div
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-[#23293a] mb-1">{label}</h3>
                  <p className="text-3xl font-bold text-[#cfac33]">{value}</p>
                  <p className="text-sm text-gray-500 mt-2">View and manage {label.toLowerCase()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Components */}
        {activeSection === 'lawyers' && <LawyersModule />}
        {activeSection === 'enquiries' && <EnquiriesModule />}
        {activeSection === 'posts' && <PostsModule />}
        {activeSection === 'services' && <ServicesModule />}
        {activeSection === 'news' && <NewsModule />}
        {activeSection === 'subadmins' && <SubAdminModule />}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-[#23293a]">Homepage Visibility</h2>
            <div className="flex flex-col gap-6">
              {[
                { field: 'showTeam', label: 'Show Team Section' },
                { field: 'showNews', label: 'Show News Section' },
                { field: 'showServices', label: 'Show Services Section' },
                { field: 'showBlog', label: 'Show Blog Section' }
              ].map(({ field, label }) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="font-medium text-lg text-gray-800">{label}</span>
                  <input
                    type="checkbox"
                    checked={settings[field]}
                    onChange={(e) => updateSetting(field, e.target.checked)}
                    className="w-6 h-6 cursor-pointer accent-[#cfac33]"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
