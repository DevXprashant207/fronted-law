import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LawyersModule from "./subLawyersModule";
import EnquiriesModule from "./subEnquiriesModule";
import MediaModule from "./MediaModule";
import NewsModule from "./subNewsModule";
import PostsModule from "./subPostsModule";
import ServicesModule from "./subServicesModule";

function SubAdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [permissions, setPermissions] = useState(null);

  const [counts, setCounts] = useState({
    news: 0,
    lawyers: 0,
    posts: 0,
    services: 0,
    enquiries: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("subAdminToken");
    if (!token) return navigate("/admin/login");

    const fetchPermissionsAndCounts = async () => {
      try {
        // Fetch permissions
        const res = await fetch("https://api.guptalawoffices.in/api/subadmin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          navigate("/admin/login");
          return;
        }

        setPermissions(data);

        // Fetch counts (only for allowed sections)
        const [
          newsRes,
          lawyersRes,
          postsRes,
          servicesRes,
          enquiriesRes,
        ] = await Promise.all([
          data.canManageNews
            ? fetch("https://api.guptalawoffices.in/api/news/").then((r) =>
                r.json()
              )
            : Promise.resolve({ data: [] }),
          data.canManageLawyers
            ? fetch("https://api.guptalawoffices.in/api/lawyers").then((r) =>
                r.json()
              )
            : Promise.resolve({ data: [] }),
          data.canManagePosts
            ? fetch("https://api.guptalawoffices.in/api/posts/").then((r) =>
                r.json()
              )
            : Promise.resolve({ data: [] }),
          data.canManageServices
            ? fetch("https://api.guptalawoffices.in/api/services/").then((r) =>
                r.json()
              )
            : Promise.resolve({ data: [] }),
          data.canManageEnquiries
            ? fetch(
                "https://api.guptalawoffices.in/api/admin/enquiries?limit=1000",
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              ).then((r) => r.json())
            : Promise.resolve({ data: [] }),
        ]);

        setCounts({
          news: newsRes.data?.length || 0,
          lawyers: lawyersRes.data?.length || 0,
          posts: postsRes.data?.length || 0,
          services: servicesRes.data?.length || 0,
          enquiries: Array.isArray(enquiriesRes.data)
            ? enquiriesRes.data.length
            : 0,
        });
      } catch (err) {
        console.error("Error fetching subadmin data:", err);
        navigate("/admin/login");
      }
    };

    fetchPermissionsAndCounts();
  }, [navigate]);

  if (!permissions)
    return <div className="min-h-[200px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-2"></div>
        </div>

  return (
    <div className="min-h-screen bg-[#f8f6f2] font-serif flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#23293a] text-white flex flex-col py-8 px-4 shadow-lg">
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-[#cfac33] rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"
              />
            </svg>
          </span>
          <span className="font-bold text-lg">Gupta Law Offices</span>
        </div>

        <nav className="flex flex-col gap-4">
          <button
            className={`text-left px-4 py-2 rounded transition ${
              activeSection === "dashboard"
                ? "bg-[#cfac33] text-white shadow-md"
                : "hover:bg-[#cfac33] hover:text-white"
            }`}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </button>

          {permissions.canManageEnquiries && (
            <button
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === "enquiries"
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33] hover:text-white"
              }`}
              onClick={() => setActiveSection("enquiries")}
            >
              Enquiries
            </button>
          )}

          {permissions.canManageLawyers && (
            <button
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === "lawyers"
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33] hover:text-white"
              }`}
              onClick={() => setActiveSection("lawyers")}
            >
              Lawyers
            </button>
          )}

          {permissions.canManageServices && (
            <button
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === "services"
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33] hover:text-white"
              }`}
              onClick={() => setActiveSection("services")}
            >
              Services
            </button>
          )}

          {permissions.canManagePosts && (
            <button
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === "posts"
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33] hover:text-white"
              }`}
              onClick={() => setActiveSection("posts")}
            >
              Blogs & Articles
            </button>
          )}

          {permissions.canManageNews && (
            <button
              className={`text-left px-4 py-2 rounded transition ${
                activeSection === "news"
                  ? "bg-[#cfac33] text-white shadow-md"
                  : "hover:bg-[#cfac33] hover:text-white"
              }`}
              onClick={() => setActiveSection("news")}
            >
              News
            </button>
          )}
        </nav>

        <button
          className="mt-auto px-4 py-2 rounded bg-[#cfac33] text-white font-semibold hover:bg-[#b8982b] transition"
          onClick={() => {
            localStorage.removeItem("subAdminToken");
            navigate("/admin/login");
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-inner rounded-tl-3xl transition-all">
        <h1 className="text-3xl font-bold text-[#23293a] mb-8 border-b pb-2">
          Sub-Admin Dashboard
        </h1>

        {/* Dashboard Overview */}
        {activeSection === "dashboard" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {permissions.canManageNews && (
              <div
                onClick={() => setActiveSection("news")}
                className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  News
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">
                  {counts.news}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  View and manage news
                </p>
              </div>
            )}

            {permissions.canManageLawyers && (
              <div
                onClick={() => setActiveSection("lawyers")}
                className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  Lawyers
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">
                  {counts.lawyers}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  View and manage lawyers
                </p>
              </div>
            )}

            {permissions.canManagePosts && (
              <div
                onClick={() => setActiveSection("posts")}
                className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  Posts
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">
                  {counts.posts}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Manage blogs & articles
                </p>
              </div>
            )}

            {permissions.canManageServices && (
              <div
                onClick={() => setActiveSection("services")}
                className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  Services
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">
                  {counts.services}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Manage services
                </p>
              </div>
            )}

            {permissions.canManageEnquiries && (
              <div
                onClick={() => setActiveSection("enquiries")}
                className="bg-white cursor-pointer p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
              >
                <h3 className="text-lg font-semibold text-[#23293a] mb-1">
                  Enquiries
                </h3>
                <p className="text-3xl font-bold text-[#cfac33]">
                  {counts.enquiries}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  View and manage enquiries
                </p>
              </div>
            )}
          </div>
        )}

        {/* Section Components */}
        {activeSection === "lawyers" && <LawyersModule />}
        {activeSection === "enquiries" && <EnquiriesModule />}
        {activeSection === "posts" && <PostsModule />}
        {activeSection === "services" && <ServicesModule />}
        {activeSection === "news" && <NewsModule />}
      </main>
    </div>
  );
}

export default SubAdminDashboard;
