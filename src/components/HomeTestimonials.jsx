import React, { useState } from 'react';

const testimonials = [
  {
  name: 'Naman Gupta',
    location: 'Gate-Number-Two, T-93/I, opposite Saket-District-Court, Khirki Extension, Malviya Nagar, New Delhi, Delhi 110017',
    text: 'The tours in this website are great. I had been really enjoy with my family! The team is very professional and taking care of the customers. Will surely recommend to my friend to join this company!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Christopher Thompson',
    location: 'Washington',
    text: 'The legal team exceeded my expectations. They were professional, responsive, and truly cared about my case. Highly recommended!',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Elizabeth Brown',
    location: 'Los Angeles',
    text: 'I felt supported throughout the process. The lawyers explained everything clearly and made me feel confident in my decisions.',
    stars: 4.5,
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Michael Lee',
    location: 'New York',
    text: 'Excellent service and attention to detail. The team handled my case with expertise and compassion.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    name: 'Priya Sharma',
    location: 'Chicago',
    text: 'Very professional and knowledgeable lawyers. I am grateful for their help and would recommend them to anyone.',
    stars: 4.5,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'David Kim',
    location: 'Houston',
    text: 'Quick response and great results. The team made a stressful situation much easier to handle.',
    stars: 5,
    image: 'https://randomuser.me/api/portraits/men/23.jpg',
  },
];

function StarRating({ stars }) {
  const fullStars = Math.floor(stars);
  const halfStar = stars % 1 >= 0.5;
  return (
    <span className="flex gap-1 text-[#bfa77a] text-xl">
      {[...Array(fullStars)].map((_, i) => <span key={i}>★</span>)}
      {halfStar && <span>☆</span>}
    </span>
  );
}

function HomeTestimonials() {
  const [active, setActive] = useState(0);
  const visibleCount = 4;
  const total = testimonials.length;

  const next = () => setActive((prev) => (prev + 1) % total);
  const prev = () => setActive((prev) => (prev - 1 + total) % total);

  return (
    <section className="relative py-16 px-2 md:px-10 bg-white">
      <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center pointer-events-none select-none">
        <span className="text-[7vw] font-bold uppercase text-[#e5e2dc] opacity-10 md:opacity-15" style={{letterSpacing: '0.1em'}}>TESTIMONIALS</span>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#23293a] text-center mb-10">What Our Clients Say</h2>
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center w-full ">
          {Array.from({ length: visibleCount }).map((_, idx) => {
            const i = (active + idx) % total;
            const t = testimonials[i];
            return (
              <div key={i} className="bg-white min-h-[18rem] overflow-scroll no-scrollbar rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center transition-all duration-300 scale-100 border-2 border-[#e5e2dc]" style={{width: '100%', maxWidth: '220px', minWidth: '160px', height: '220px', maxHeight: '220px'}}>
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#e5e2dc] mb-2" />
                <div className="font-bold text-base text-[#23293a] text-center">{t.name}</div>
                <div className="text-xs text-[#B88A2F] text-center mb-1">{t.location}</div>
                <div className="flex justify-center mb-1"><StarRating stars={t.stars}/></div>
                <div className="text-[#23293a] text-sm leading-relaxed italic text-center line-clamp-3 overflow-scroll no-scrollbar">{t.text}</div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={prev} className="w-10 h-10 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#e5e2dc] transition-all">&#60;</button>
          <button onClick={next} className="w-10 h-10 rounded-full bg-white border-2 border-[#B88A2F] flex items-center justify-center text-[#B88A2F] text-xl font-bold shadow hover:bg-[#e5e2dc] transition-all">&#62;</button>
        </div>
      </div>
    </section>
  );
}

export default HomeTestimonials;
