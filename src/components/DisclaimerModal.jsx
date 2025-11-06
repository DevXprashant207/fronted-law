import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function DisclaimerModal({ onAgree }) {
  const handleDisagree = () => {
    window.close();
    window.location.href = 'about:blank';
  };

  // Disable scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl p-8 max-w-3xl w-full max-h-[80vh] flex flex-col shadow-2xl border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-[#23293a] mb-4 text-center">⚖️ Disclaimer</h2>
          
          <div className="overflow-y-auto flex-1 mb-6 p-2 text-gray-700 text-sm space-y-3 leading-relaxed">
            <p>
              The rules of the Bar Council of India impose restrictions on maintaining a web page and do not permit lawyers
              to provide information concerning their areas of practice. Gupta Law Offices  is, therefore,
              constrained from providing any further information on this web page. The rules of the Bar Council of India prohibit law firms
              from soliciting work or advertising in any manner.
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>The user wishes to gain more information about Gupta Law Offices  for personal use only.</li>
              <li>Any information obtained or material downloaded from this website is completely at the user’s discretion.</li>
              <li>No lawyer-client relationship is created by visiting this site.</li>
              <li>Information provided here is not legal advice.</li>
              <li>Gupta Law Offices  is not liable for actions taken based on this website.</li>
              <li>For legal issues, independent legal advice must be sought.</li>
            </ul>

            <p className="mt-3 font-semibold text-gray-800">By clicking “I Agree”, you accept these terms.</p>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onAgree} // <-- updated prop
              className="bg-[#cfac33] text-white font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              I Agree
            </button>

            {/* Optional: Uncomment if you want a disagree button */}
            {/* <button
              onClick={handleDisagree}
              className="bg-red-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-red-600 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              I Disagree
            </button> */}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DisclaimerModal;
