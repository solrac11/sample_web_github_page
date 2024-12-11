import { CheckCircle } from 'lucide-react'

const features = [
  "Responsive Design",
  "SEO Optimization",
  "SSL Certificates",
  "Daily Backups",
  "CDN Integration",
  "Expert Support"
]

export default function Features() {
  return (
    <div id="features" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-gray-600">Everything you need for a successful online presence</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
