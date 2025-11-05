"use client"

import { useEffect, useState } from "react"
import ServiceCard from "../components/ServiceCard"

const API_BASE = "https://api.guptalawoffices.in"

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // only take first 6 for homepage
          setServices(data.data.slice(0, 6))
        } else {
          setError("Failed to fetch services")
        }
      })
      .catch(() => setError("Failed to fetch services"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10">Loading services...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  return (
    <section className="bg-[#faf4e4]">
    <section className="bg-white shape-wavy-br-services">
      <section className="mx-auto max-w-7xl px-6 md:px-10 py-16">
        <header className="mx-auto max-w-3xl text-center mb-12">
          <p className="text-sm font-medium text-primary tracking-wide uppercase">Practice Areas</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-serif font-bold text-balance text-foreground">Our Services</h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Strategic counsel delivered with precision. Explore our key practice areas where experience, discretion, and
            results come together.
          </p>
        </header>

        {services.length === 0 ? (
          <div className="text-center text-muted-foreground">No services found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service._id || service.id}
                name={service.name}
                slug={service.slug}
                imageUrl={service.imageUrl ? `${API_BASE}${service.imageUrl}` : null}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <a
            href="/services"
            className="inline-flex items-center rounded-md border border-primary/30 bg-background px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            View all services
          </a>
        </div>
      </section>
    </section>
    </section>
  )
}

export default Services
