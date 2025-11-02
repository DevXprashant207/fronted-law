import React from "react";
import slider2 from "../assets/HeroSection/slider-item-2.jpg";
import slider3 from '../assets/HeroSection/slider-item-3.jpg';
function About() {
  return (
    <section className="bg-[#faf9f6] text-gray-800 font-serif">
      {/* Hero Section with Background */}
      <div className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src={slider2}
          alt="Law firm background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/60 via-[#000000]/50 to-[#faf9f6]/70"></div>
        <div className="relative z-10 text-white px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-wide uppercase">
            About Gupta Law Offices
          </h1>
          <p className="text-lg md:text-xl text-[#f8f8f8] max-w-3xl mx-auto">
            Excellence, Ethics, and Expertise — Your Trusted Legal Partner
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 border-l-4 border-[#b68b4c] pl-4">
            Who We Are
          </h2>
          <p className="text-gray-700 mb-5 leading-relaxed">
            <strong>Gupta Law Offices (GLO)</strong> is a leading legal firm
            driven by integrity, commitment, and strategic excellence. Our firm
            provides expert legal counsel across civil, criminal, corporate, and
            family law with a client-first approach.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Founded by <strong>Mr. Naman Gupta</strong>, a respected advocate with
            years of experience, GLO stands for professionalism, discretion, and
            results. We pride ourselves on building long-term relationships based
            on trust, clarity, and impactful advocacy.
          </p>
        </div>

        <div className="relative">
          <img
            src={slider3}
            alt="Law office interior"
            className="rounded-2xl shadow-2xl border border-[#e5d3b3]"
          />
          <div className="absolute -bottom-6 -left-6 bg-[#b68b4c] text-white px-6 py-3 rounded-lg shadow-lg">
            <p className="text-sm font-medium tracking-wide">
              15+ Years of Legal Excellence
            </p>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="bg-white py-20 border-t border-[#ede0c6]">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 border-b-2 border-[#b68b4c] inline-block pb-2">
              Our Vision
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To become a trusted legal institution recognized for delivering
              justice, ethical advocacy, and exceptional results with a human
              touch.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 border-b-2 border-[#b68b4c] inline-block pb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              To provide precise, personalized, and effective legal solutions
              that protect our clients’ interests while upholding the highest
              standards of integrity and professionalism.
            </p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-[#faf3e3] py-20 text-center">
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-12">
          Achievements & Milestones
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-10">
          {[
            { count: "500+", label: "Successful Cases" },
            { count: "200+", label: "Satisfied Clients" },
            { count: "15+", label: "Years of Experience" },
            { count: "10+", label: "Awards & Recognitions" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl border border-[#e7dac7] hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-5xl font-extrabold text-[#b68b4c]">
                {item.count}
              </h3>
              <p className="mt-2 text-gray-700 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-20 border-t border-[#e7dac7]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
            Whether you’re seeking legal advice or representation, Gupta Law
            Offices is here to guide you with professionalism, confidentiality,
            and clarity.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-12 text-gray-800">
            <div>
              <h4 className="font-semibold text-lg mb-1">📍 Office Address</h4>
              <p>123 Legal Avenue, Delhi NCR, India</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">📞 Phone</h4>
              <p>+91 98765 43210</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">✉️ Email</h4>
              <p>contact@guptalaw.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
