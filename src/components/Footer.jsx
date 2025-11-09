import logo from '../assets/logo.jpg'; 
function Footer() {
  return (
    <footer className="bg-black text-[#bfa77a] pt-16 pb-8 px-4 font-serif">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#35332f]">
        <div className="flex flex-col items-start gap-2">
          <img src={logo} alt="Gupta Law offices Logo" className="h-10 mb-2" />
          <span className="font-bold text-lg tracking-wide text-white">Gupta Law offices</span>
        </div>
        <div>
          <h3 className="text-white text-lg mb-3 font-semibold">Contact Info</h3>
          <ul className="space-y-2 text-white">
            <li className="flex items-center gap-2"><span>📞</span> +91  9312242917</li>
            <li className="flex items-center gap-2"><span>✉️</span> contact@guptalawoffices.co</li>
            <li className="flex items-center gap-2"><span>⏰</span> Mon — Fri 9.00-18.00</li>
            <li className="flex items-center gap-2"><span>📍</span> T 93/I, Ksirki, Oppposite Saket District Court Gate No. 2, Malviya Nagar-110017</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-3 font-semibold">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline text-white">Practice Areas</a></li>
            <li><a href="#" className="hover:underline text-white">Privacy & Policy</a></li>
            <li><a href="#" className="hover:underline text-white">Our Story</a></li>
            <li><a href="#" className="hover:underline text-white">Be Our Partner</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg mb-3 font-semibold">Our Location</h3>
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-6">
        <div className="flex gap-6 text-white text-2xl mb-2 md:mb-0">
          {/* Social icons here */}
          <a href="#" aria-label="Facebook" className="hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/></svg></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.001 3.601 4.601v5.595z"/></svg></a>
          <a href="#" aria-label="Pinterest" className="hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.396 7.633 11.093-.106-.943-.201-2.389.042-3.419.221-.963 1.426-6.137 1.426-6.137s-.363-.727-.363-1.803c0-1.689.98-2.951 2.199-2.951 1.037 0 1.537.779 1.537 1.713 0 1.044-.666 2.604-1.009 4.052-.287 1.217.609 2.211 1.805 2.211 2.166 0 3.832-2.287 3.832-5.588 0-2.316-1.666-3.942-4.045-3.942-2.761 0-4.389 2.072-4.389 4.215 0 .839.323 1.741.727 2.23.081.098.093.184.068.282-.073.299-.237.963-.269 1.096-.042.174-.137.211-.317.128-1.181-.547-1.917-2.263-1.917-3.646 0-2.97 2.417-6.527 7.217-6.527 3.86 0 6.399 2.792 6.399 5.792 0 3.978-2.213 6.934-5.497 6.934-1.099 0-2.132-.594-2.484-1.267l-.676 2.579c-.205.782-.607 1.765-.904 2.365.682.211 1.399.326 2.148.326 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg></a>
          <a href="#" aria-label="X" className="hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M17.53 3.5h3.47l-7.57 8.62 8.93 11.38h-7.02l-5.51-7.01-6.3 7.01h-3.49l8.09-9.02-8.62-10.98h7.09l5.01 6.39 5.92-6.39zm-2.49 17.5h2.01l-6.51-8.28-2.01 2.28 6.51 6z"/></svg></a>
          <a href="#" aria-label="Instagram" className="hover:text-white transition"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.851s-.011 3.584-.069 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.011-3.584.069-4.851c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.945.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.278-.07 1.686-.07 4.945s.012 3.667.07 4.945c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.278.058 1.686.07 4.945.07s3.667-.012 4.945-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.278.07-1.686.07-4.945s-.012-3.667-.07-4.945c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.278-.058-1.686-.07-4.945-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
        </div>
  <div className="text-white text-sm">Copyright © 2025 Gupta Law offices, All Rights Reserved</div>
        <button className="bg-[#e5e2dc] text-[#232220] rounded-full p-2 ml-4 shadow hover:bg-[#bfa77a] transition-all" aria-label="Scroll to top" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
