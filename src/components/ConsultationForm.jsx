import React, { useState } from 'react';

const practiceAreas = [
  { id: 'law1', name: 'Criminal Law' },
  { id: 'law2', name: 'Family Law' },
  { id: 'Corporate Law', name: 'Corporate Law' },
  { id: 'law4', name: 'Intellectual Property' },
  { id: 'law5', name: 'Civil Litigation' },
  { id: 'law6', name: 'Employment Law' },
  { id: 'law7', name: 'Real Estate Law' },
  { id: 'law8', name: 'Tax Law' },
  { id: 'law9', name: 'Immigration Law' },
  { id: 'other', name: 'Other' },
];

function ConsultationForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lawId: practiceAreas[0].id,
    message: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [thankYou, setThankYou] = useState(false);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAreaChange = e => {
    setForm({ ...form, lawId: e.target.value });
  };
  const validate = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = 'The field is required.';
    if (!form.lastName) newErrors.lastName = 'The field is required.';
    if (!form.email) newErrors.email = 'The field is required.';
    if (!form.phone) newErrors.phone = 'The field is required.';
    if (!form.message) newErrors.message = 'The field is required.';
    return newErrors;
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        await fetch('http://localhost:3000/api/enquiry/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        setThankYou(true);
        setForm({
          firstName: '', lastName: '', email: '', phone: '', lawId: practiceAreas[0].id, message: '', imageUrl: ''
        });
      } catch {
        alert('Failed to send enquiry. Please try again.');
      }
    }
  };
  return (
    <section id="consultation-section" className="bg-[#f8f6f2] py-16 px-4 md:px-10">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-[#23293a] mb-2 text-left tracking-widest uppercase">Contact Us</h2>
        <h3 className="text-base md:text-lg font-serif font-bold text-[#7c6a4c] mb-6 text-left leading-tight">Law is a complex matter that can lead to significant problems if disregarded. Allow us to assist you!</h3>
        {thankYou ? (
          <div className="bg-white rounded-xl shadow p-8 text-center text-[#7c6a4c] text-xl font-semibold">Thank you for your enquiry! We will get back to you soon.</div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name*" className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none" />
                {errors.firstName && <div className="text-xs text-[#bfa77a] mt-1">{errors.firstName}</div>}
              </div>
              <div>
                <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name*" className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none" />
                {errors.lastName && <div className="text-xs text-[#bfa77a] mt-1">{errors.lastName}</div>}
              </div>
              <div>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email*" className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none" />
                {errors.email && <div className="text-xs text-[#bfa77a] mt-1">{errors.email}</div>}
              </div>
              <div>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone*" className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none" />
                {errors.phone && <div className="text-xs text-[#bfa77a] mt-1">{errors.phone}</div>}
              </div>
            </div>
            <div>
              <select name="lawId" value={form.lawId} onChange={handleAreaChange} className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none">
                {practiceAreas.map(area => <option key={area.id} value={area.id}>{area.name}</option>)}
              </select>
            </div>
            <div>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message*" rows={4} className="w-full p-3 rounded bg-white border border-[#e5e2dc] focus:outline-none" />
              {errors.message && <div className="text-xs text-[#bfa77a] mt-1">{errors.message}</div>}
            </div>
            <button type="submit" className="w-full bg-[#bfa77a] text-white py-4 rounded font-bold text-lg tracking-wide shadow hover:bg-[#a08a5c] transition-all">SUBMIT NOW</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ConsultationForm;
