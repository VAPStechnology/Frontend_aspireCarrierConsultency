import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-teal-600">Aspire Career Consultancy</h1>
                    </div>
                    <nav className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-teal-500 font-medium transition">Home</Link>
                        <Link to="/services" className="text-gray-700 hover:text-teal-500 font-medium transition">Services</Link>
                        <Link to="/about" className="text-gray-700 hover:text-teal-500 font-medium transition">About Us</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-teal-500 font-medium transition">Contact</Link>
                    </nav>
                    <div className="flex space-x-4">
                        <Link to="/login" className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition">Login</Link>
                        <Link to="/register" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Register</Link>
                    </div>
                </div>
            </header>

        </div>
    )
}

export default Header
