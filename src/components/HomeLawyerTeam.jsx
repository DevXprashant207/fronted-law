import React, { useEffect, useState } from "react";
import LawyerCard from "./LawyerCard";
const API_BASE = "https://api.guptalawoffices.in";
const PLACEHOLDER_IMAGE = "/default-lawyer.png";

function HomeLawyerTeam() {
  const [lawyers, setLawyers] = useState([]);

  // Fetch lawyers
  useEffect(() => {
    fetch(`${API_BASE}/api/lawyers`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setLawyers(data.data);
        } else {
          setLawyers([]);
        }
      })
      .catch((err) => console.error("Failed to fetch lawyers:", err));
  }, []);

  const getImageUrl = (url) => {
    if (!url) return PLACEHOLDER_IMAGE;
    return url.startsWith("http") ? url : `${API_BASE}${url}`;
  };

  // Duplicate list for seamless infinite scrolling
  const duplicatedLawyers = [...lawyers, ...lawyers];

  return (
    <section className="relative py-16 px-4 md:px-10 bg-[#faf4e4] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg font-bold text-black mb-2 text-left tracking-widest uppercase">
          Team
        </h2>
        <h3 className="text-2xl md:text-5xl font-serif font-bold text-black text-left leading-tight">
          Our Lawyer Team
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#B88A2F] to-[#B88A2F] rounded mb-10 ml-0" />

        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-6 animate-scroll-infinite"
            style={{
              width: `${duplicatedLawyers.length * 260}px`, // card width + gap
            }}
          >
            {duplicatedLawyers.map((lawyer, idx) => (
              <div
                className="min-w-[240px] flex-shrink-0"
                key={`${lawyer._id || idx}-${idx}`}
              >
                <LawyerCard lawyer={lawyer} image={getImageUrl(lawyer.imageUrl)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smooth infinite animation */}
      <style>{`
        @keyframes scrollInfinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-infinite {
          animation: scrollInfinite 30s linear infinite;
          will-change: transform;
        }

        /* Pause on hover for better UX */
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default HomeLawyerTeam;
