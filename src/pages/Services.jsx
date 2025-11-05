import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

const API_BASE = 'https://api.guptalawoffices.in';

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.data);
        else setError('Failed to fetch services');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch services');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#cfac33] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-5xl font-bold text-[#000000] mb-12 text-center">Our Services</h2>

      {services.length === 0 ? (
        <div className="text-center text-gray-500">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service._id || service.id}
              name={service.name}
              slug={service.slug}
              imageUrl={service.imageUrl ? `${API_BASE}${service.imageUrl}` : null} // ⬅ pass image from API
              onLearnMore={() => navigate(`/services/${service.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
