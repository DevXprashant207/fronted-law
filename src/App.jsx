import { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DisclaimerModal from "./components/DisclaimerModal";
import "./App.css";

// ✅ Lazy-loaded pages
const HeroSection = lazy(() => import("./components/HeroSection"));
const HomeAboutUs = lazy(() => import("./components/HomeAboutUs"));
const HomeServices = lazy(() => import("./components/HomeServices"));
const HomeLawyerTeam = lazy(() => import("./components/HomeLawyerTeam"));
const HomeStats = lazy(() => import("./components/HomeStats"));
const HomeTestimonials = lazy(() => import("./components/HomeTestimonials"));
const HomeCaseStudies = lazy(() => import("./components/HomeCaseStudies"));
const ConsultationForm = lazy(() => import("./components/ConsultationForm"));

const Services = lazy(() => import("./pages/Services"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetail"));
const Lawyers = lazy(() => import("./pages/Lawyers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const News = lazy(() => import("./pages/News"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const AdminNews = lazy(() => import("./pages/AdminNews"));
const AdminEnquiries = lazy(() => import("./pages/AdminEnquiries"));
const About = lazy(() => import("./pages/AboutUs"));
const SubAdminDashboard = lazy(() => import("./pages/SubAdminDashboard"));

// ✅ Protected Route (for SubAdmin / Admin)
const ProtectedRoute = ({ children, requireSubAdmin = false }) => {
  const [user, setUser] = useState(localStorage.getItem("userRole"));
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b91c1c]"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  if (requireSubAdmin && user !== "subadmin")
    return <Navigate to="/" replace />;

  return children;
};

// ✅ Main App Component
export default function App() {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [settings, setSettings] = useState({
    showTeam: true,
    showNews: true,
    showServices: true,
    showBlog: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("https://api.guptalawoffices.in/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        setSettings({
          showTeam: data?.showTeam ?? true,
          showNews: data?.showNews ?? true,
          showServices: data?.showServices ?? true,
          showBlog: data?.showBlog ?? true,
        });
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };

    fetchSettings();

    const agreed = localStorage.getItem("disclaimerAgreed");
    if (agreed === "true") setHasAgreed(true);
    else setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem("disclaimerAgreed", "true");
    setHasAgreed(true);
    setShowDisclaimer(false);
  };

  return (
    <Router>
      <Navbar />
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#b91c1c]"></div>
          </div>
        }
      >
        <div
          className={`min-h-screen bg-white font-serif flex flex-col transition-all duration-500 ${
            showDisclaimer ? "blur-sm scale-[0.99]" : ""
          }`}
        >
          <Routes>
            {/* 🏠 Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <HomeAboutUs />
                  {settings.showServices && <HomeServices />}
                  {settings.showTeam && <HomeLawyerTeam />}
                  <HomeStats />
                  <HomeTestimonials />
                  {settings.showNews && <HomeCaseStudies />}
                  {hasAgreed && <ConsultationForm />}
                </>
              }
            />

            {/* 🌐 Public Routes */}
            <Route path="/consultation" element={<ConsultationForm />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/lawyers" element={<Lawyers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/about" element={<About />} />

            {/* 🔐 Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute>
                  <AdminNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/enquiries"
              element={
                <ProtectedRoute>
                  <AdminEnquiries />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subadmin/dashboard"
              element={
                <ProtectedRoute requireSubAdmin={true}>
                  <SubAdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />
        </div>
      </Suspense>

      {showDisclaimer && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <DisclaimerModal onAgree={handleAgree} />
        </div>
      )}
    </Router>
  );
}
