"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/HeaderLogo.png"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // ... no changes needed in the useEffect hook
    const computeEndTarget = () => {
      const footerEl = document.querySelector("#site-footer") || document.querySelector("footer")
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect()
        return Math.max(1, rect.top + window.scrollY)
      }
      return Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }

    let endTarget = computeEndTarget()

    const handleScroll = () => {
      const y = window.scrollY
      const pct = Math.min(1, Math.max(0, y / endTarget))
      setProgress(pct)
    }

    const handleResize = () => {
      endTarget = computeEndTarget()
      handleScroll()
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // 1. Define common classes for the navigation links for the hover effect
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
  `

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
        <img src={logo || "/placeholder.svg"} alt="Logo" className="h-12 w-32" />
      </div>

      <div className="hidden md:flex gap-8 text-[#000000] font-medium">
        {/* 2. Apply the classes to each link */}
        <Link to="/" className={navLinkClasses}>Home</Link>
        <Link to="/services" className={navLinkClasses}>Services</Link>
        <Link to="/lawyers" className={navLinkClasses}>Lawyers</Link>
        <Link to="/blog" className={navLinkClasses}>Blog</Link>
        <Link to="/news" className={navLinkClasses}>News/Articles</Link>
        <Link to="/about">About Us</Link>
        <Link to="/admin/login" className="bg-[#B88A2F] text-white px-4 py-1 rounded font-semibold ml-2">
          Admin
        </Link>
      </div>

      <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] mb-1 transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`block w-6 h-0.5 bg-[#7c6a4c] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setOpen(false)} />
          <div
            className="absolute top-0 right-0 w-2/3 max-w-xs bg-[#f8f6f2] h-full shadow-lg p-6 flex flex-col gap-6 animate-slide-in"
            style={{ zIndex: 51 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* You can optionally apply the same effect to mobile links too */}
            <Link to="/" className={navLinkClasses} onClick={() => setOpen(false)}>Home</Link>
            <Link to="/services" className={navLinkClasses} onClick={() => setOpen(false)}>Services</Link>
            <Link to="/lawyers" className={navLinkClasses} onClick={() => setOpen(false)}>Lawyers</Link>
            <Link to="/blog" className={navLinkClasses} onClick={() => setOpen(false)}>Blog</Link>
            <Link to="/news" className={navLinkClasses} onClick={() => setOpen(false)}>News/Articles</Link>
            <Link to="/about"className={navLinkClasses} onClick={() => setOpen(false)}>About Us</Link>
            <Link
              to="/admin/login"
              className="bg-[#B88A2F] text-white px-4 py-1 rounded font-semibold"
              onClick={() => setOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar