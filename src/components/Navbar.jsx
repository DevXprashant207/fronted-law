"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [settings, setSettings] = useState({
    showTeam: true,
    showNews: true,
    showServices: true,
    showBlog: true,
  });

  // ✅ Fetch settings from API
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
  }, []);

  useEffect(() => {
    const computeEndTarget = () => {
      const footerEl =
        document.querySelector("#site-footer") ||
        document.querySelector("footer");
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        return Math.max(1, rect.top + window.scrollY);
      }
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    let endTarget = computeEndTarget();

    const handleScroll = () => {
      const y = window.scrollY;
      const pct = Math.min(1, Math.max(0, y / endTarget));
      setProgress(pct);
    };

    const handleResize = () => {
      endTarget = computeEndTarget();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinkClasses = `
    relative pb-1
    after:content-[''] 
    after:absolute 
    after:left-0 
    after:bottom-0 
    after:w-full 
    after:h-[2px] 
    after:bg-[#B88A2F] 
    after:scale-x-0 
    after:origin-left 
    after:transition-transform 
    after:duration-300 
    after:ease-out
    hover:after:scale-x-100
  `;

  return (
    <nav className="sticky top-0 z-[100] bg-white sm:pl-16 px-6 py-3 flex items-center justify-between shadow-md">
      {/* Progress track */}
      <div className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#B88A2F]/20" />
      {/* Progress bar */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-[2px] bg-[#B88A2F]"
        style={{ width: `${progress * 100}%` }}
      />

      <div className="flex items-center gap-2">
        <img src={logo || "/placeholder.svg"} alt="Logo" className="h-16 rounded-xl" />
        <span className="font-bold text-xl tracking-wide text-black">
          Gupta Law Offices
        </span>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex gap-8 text-[#000000] font-medium">
        <Link to="/" className={navLinkClasses}>Home</Link>
        {settings.showServices && (
          <Link to="/services" className={navLinkClasses}>Services</Link>
        )}
        {settings.showTeam && (
          <Link to="/lawyers" className={navLinkClasses}>Lawyers</Link>
        )}
        {settings.showBlog && (
          <Link to="/blog" className={navLinkClasses}>Blog</Link>
        )}
        {settings.showNews && (
          <Link to="/news" className={navLinkClasses}>News/Articles</Link>
        )}
        <Link to="/about" className={navLinkClasses}>About Us</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <span
          className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${
            open ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${
            open ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            style={{ zIndex: 51 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" className={navLinkClasses} onClick={() => setOpen(false)}>Home</Link>
            {settings.showServices && (
              <Link to="/services" className={navLinkClasses} onClick={() => setOpen(false)}>Services</Link>
            )}
            {settings.showTeam && (
              <Link to="/lawyers" className={navLinkClasses} onClick={() => setOpen(false)}>Lawyers</Link>
            )}
            {settings.showBlog && (
              <Link to="/blog" className={navLinkClasses} onClick={() => setOpen(false)}>Blog</Link>
            )}
            {settings.showNews && (
              <Link to="/news" className={navLinkClasses} onClick={() => setOpen(false)}>News/Articles</Link>
            )}
            <Link to="/about" className={navLinkClasses} onClick={() => setOpen(false)}>About Us</Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
