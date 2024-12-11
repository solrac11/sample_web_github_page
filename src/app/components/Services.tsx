import { Code, Globe, Server } from 'lucide-react'

const services = [
  {
    title: "Web Development",
    icon: <Code className="w-6 h-6 text-blue-800" />,
    description: "Custom websites and web applications built with modern technologies to help your business grow online."
  },
  {
    title: "Web Hosting",
    icon: <Server className="w-6 h-6 text-blue-800" />,
    description: "Reliable, secure, and fast hosting solutions with 99.9% uptime guarantee and 24/7 support."
  },
  {
    title: "Domain Services",
    icon: <Globe className="w-6 h-6 text-blue-800" />,
    description: "Domain registration, transfer, and management services to establish your online presence."
  }
]

export default function Services() {
  return (
    <div id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-gray-700">Comprehensive web solutions for your business</p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="ml-3 text-xl font-semibold text-blue-600">{service.title}</h3>
              </div>
              <p className="text-gray-800">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}