'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">Cal Technologies</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-blue-600">Services</a>
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#services" className="block px-3 py-2 text-gray-700">Services</a>
            <a href="#features" className="block px-3 py-2 text-gray-700">Features</a>
            <a href="#contact" className="block px-3 py-2 text-gray-700">Contact</a>
            <button className="w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}