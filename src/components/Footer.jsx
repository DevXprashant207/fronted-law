import React from 'react';
import logo from '../assets/logo.jpg';
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-[#000000] text-[#ffffff] pt-16 pb-10 px-8 font-serif">
      <div className="max-w-7xl mx-auto">

        {/* Top Section: Logo and Primary Links */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-10">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Gupta Law offices Logo" className="h-12 " />
              <span className="text-xl font-bold tracking-tight text-white">Gupta Law offices</span>
            </div>    
          </div>

          {/* Navigation Links - Editorial Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-8">
            <div className="space-y-4 col-span-2 md:col-span-1">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Contact</h4>
              <ul className="space-y-3 text-sm opacity-100">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>T 93/I, Ksirki, Saket District Court, New Delhi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+91 9312242917</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>contact@guptalawoffices.co</span>
                </li>
              </ul>
            </div>


            
            <div className="space-y-4">
              <h4 className="text-white font-bold text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-2 text-sm opacity-100">
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Website Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors">Accessibility</li>
              </ul>
            </div>
            <div className="space-y-4 col-span-2 md:col-span-1">
              <div>
                <h3 className="text-white text-lg mb-2 font-semibold">Our Location</h3>
                <div className="rounded-lg overflow-hidden shadow-lg border border-[#e5e2dc]">
                  <iframe
                    title="Gupta Law offices Location"
                    src="https://www.google.com/maps?q=Gate-Number-Two,+T-93/I,+opposite+Saket-District-Court,+Khirki+Extension,+Malviya+Nagar,+New+Delhi,+Delhi+110017&output=embed"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-widest opacity-100">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" strokeWidth={1.5} />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" strokeWidth={1.5} />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" strokeWidth={1.5} />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" strokeWidth={1.5} />   
          </div>

          <div className="text-[11px] uppercase tracking-widest opacity-100 text-center">
            Copyright © 2025 Gupta Law offices. All Rights Reserved.
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white hover:text-[#c5a36b] transition-colors"
          >
            Back to Top
            <div className="p-2 border border-white/20 rounded-full group-hover:border-[#c5a36b] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;