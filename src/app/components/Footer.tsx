export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">Cal Technologies</h3>
              <p className="mt-4 text-gray-400">Professional web development and hosting solutions for your business.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#services" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Contact Info</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>caltech511@gmail.com</li>
                <li>+63 (915) 078-7818</li>
                <li>Bagabag, Nueva Vizcaya</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 Cal Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }