function LawyerCard({ lawyer, image }) {
  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow p-0 flex flex-col items-start border border-[#e5e2dc] h-full w-full max-w-xs mx-auto p-4">
      <img src={image} alt={lawyer.name} className="w-full h-48 object-cover rounded-t-xl" />
      <div className="px-5 py-4 w-full">
        <h3 className="text-xs font-bold text-[#23293a] mb-1 uppercase tracking-wide">{lawyer.name}</h3>
        <p className="text-xs text-[#7c6a4c] mb-3">{lawyer.title || 'Partner'}</p>
      </div>
    </div>
  );
}

export default LawyerCard;
