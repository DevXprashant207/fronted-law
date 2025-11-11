import React, { useEffect, useState } from 'react';
import sliderImg from '../assets/HeroSection/slider-item-2.jpg';

const API_BASE = 'https://api.guptalawoffices.in/api/posts';

function CaseCard({ title, category, description }) {
  return (
    <div className="flex flex-col items-center bg-[#f8f6f2] rounded-xl shadow-md p-4 transition-transform hover:-translate-y-1 hover:shadow-lg w-64 border border-[#e5e2dc]">
      <img src={sliderImg} alt={title} className="w-56 h-36 object-cover rounded-lg mb-3 border-2 border-[#e5e2dc]" />
      <h4 className="text-lg font-bold text-black mb-1 text-center font-serif">{title}</h4>
      <span className="text-sm text-[#B88A2F] mb-1 text-center font-medium">{category}</span>
      <p className="text-xs text-black text-center mt-1 leading-relaxed">{description}</p>
    </div>
  );
}

function HomeCaseStudies() {
  const [index, setIndex] = useState(0);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch live case studies
  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        if (data.success) setCases(data.data);
        else setError('Failed to fetch case studies');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch case studies');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative py-10 px-2 md:px-8 bg-[#faf4e4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B88A2F] mx-auto mb-4"></div>
          <p className="text-[#B88A2F]">Loading case studies...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-10 px-2 md:px-8 bg-[#faf4e4] text-center text-red-500">
        {error}
      </section>
    );
  }

  if (cases.length === 0) {
    return (
      <section className="relative py-10 px-2 md:px-8 bg-[#faf4e4] text-center text-gray-500">
        No case studies available at the moment.
      </section>
    );
  }

  const visibleCount = 4;
  const visible = cases.slice(index, index + visibleCount);
  while (visible.length < visibleCount)
    visible.push(...cases.slice(0, visibleCount - visible.length));

  const next = () => setIndex((prev) => (prev + 1) % cases.length);
  const prev = () => setIndex((prev) => (prev - 1 + cases.length) % cases.length);

  return (
    <section className="relative py-10 px-2 md:px-8 bg-[#faf4e4]">
      <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none select-none">
        <span
          className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-20 mb-2"
          style={{ letterSpacing: '0.1em' }}
        >
          CASE STUDIES
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-black drop-shadow-lg">Case Studies</h2>
          <a href="/blog" className="text-black font-semibold text-base flex items-center gap-1 hover:underline">
            VIEW ALL CASES &rarr;
          </a>
        </div>

        <div className="flex gap-6 justify-center mb-8 flex-wrap">
          {visible.map((c, i) => (
            <CaseCard
              key={i}
              title={c.title || 'Untitled Case'}
              category={c.category || 'General Law'}
              description={c.description || 'No description available.'}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all"
          >
            &#60;
          </button>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#fff2c5] transition-all"
          >
            &#62;
          </button>
        </div>
      </div>
    </section>
  );
}

export default HomeCaseStudies;
