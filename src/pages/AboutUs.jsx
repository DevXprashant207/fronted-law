import React from "react";
import { MapPin, Phone, Mail } from 'lucide-react';
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
            <strong>Gupta Law Offices (GLO)</strong> is a distinguished law firm delivering strategic legal services backed by experience and integrity. We represent clients across diverse legal domains, offering tailored solutions that address both legal and practical concerns.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Led by <strong>Mr. Naman Gupta</strong>, and supported by associates with more than 13 years of collective experience, the firm is known for its disciplined approach, strategic thinking, and consistent results. At GLO, we believe in delivering clear legal advice, timely solutions, and representation that clients can trust.
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
              To establish Gupta Law Offices (GLO) as a distinguished and trusted legal institution known for its unwavering commitment to justice, ethical advocacy, and professional excellence. Our vision is to be recognized for delivering well-reasoned legal solutions that combine deep legal knowledge with practical insight, while maintaining the highest standards of integrity and accountability.

<br/>We aspire to create a lasting impact in the legal profession by building long-term relationships with our clients, institutions, and communities, grounded in trust, transparency, and consistent results. Through continuous learning, disciplined practice, and a client-first philosophy, we aim to contribute meaningfully to the development of a fair, accessible, and effective legal system.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 border-b-2 border-[#b68b4c] inline-block pb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to provide comprehensive, precise, and result-oriented legal services tailored to the unique needs of each client. We are committed to representing individuals, businesses, and institutions with diligence, discretion, and strategic clarity across all stages of legal proceedings.

<br/>At Gupta Law Offices, we focus on understanding the practical realities behind every legal issue, enabling us to deliver solutions that are not only legally sound but also commercially and socially effective. We uphold the highest standards of professionalism, ethical conduct, and confidentiality while ensuring clear communication, timely action, and strong advocacy. Our goal is to protect our clients’ rights, safeguard their interests, and achieve sustainable legal outcomes through responsible and principled practice.
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
      <div className="max-w-4xl mx-auto px-6 text-center my-8">
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-[#c5a36b] mx-auto mb-6"></div> {/* Elegant accent line */}
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Whether you’re seeking legal advice or representation, Gupta Law
            Offices is here to guide you with professionalism, confidentiality,
            and clarity.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Address Card */}
          <div className="group p-8 rounded-2xl border border-gray-100 bg-[#fcfaf7] hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-[#1a1a1a] transition-colors duration-300">
              <MapPin className="w-6 h-6 text-[#c5a36b] group-hover:text-white" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">Office Address</h4>
            <p className="text-gray-600 leading-relaxed">
              T 93/I, Ksirki, Opposite Saket District Court Gate No. 2, <br />
              Malviya Nagar-110017
            </p>
          </div>

          {/* Phone Card */}
          <div className="group p-8 rounded-2xl border border-gray-100 bg-[#fcfaf7] hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-[#1a1a1a] transition-colors duration-300">
              <Phone className="w-6 h-6 text-[#c5a36b] group-hover:text-white" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">Phone</h4>
            <a 
              href="tel:+919312242917" 
              className="text-[#c5a36b] font-semibold text-lg hover:underline block"
            >
              +91 9312242917
            </a>
            <p className="text-sm text-gray-400 mt-2">Mon - Sat, 9am - 6pm</p>
          </div>

          {/* Email Card */}
          <div className="group p-8 rounded-2xl border border-gray-100 bg-[#fcfaf7] hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-[#1a1a1a] transition-colors duration-300">
              <Mail className="w-6 h-6 text-[#c5a36b] group-hover:text-white" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-3">Email</h4>
            <a 
              href="mailto:contact@guptalaw.com" 
              className="text-[#c5a36b] font-semibold text-lg hover:underline block"
            >
              contact@guptalaw.com
            </a>
            <p className="text-sm text-gray-400 mt-2">We respond within 24 hours</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
