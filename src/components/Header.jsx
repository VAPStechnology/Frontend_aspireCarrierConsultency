import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from "../hooks/useAuth"; // adjust the path if needed

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuLinks = (
    <>
      <Link to="/" className="text-gray-700 hover:text-teal-500 font-medium transition">Home</Link>
      <Link to="/services" className="text-gray-700 hover:text-teal-500 font-medium transition">Services</Link>
      <Link to="/about" className="text-gray-700 hover:text-teal-500 font-medium transition">About Us</Link>
      <Link to="/contact" className="text-gray-700 hover:text-teal-500 font-medium transition">Contact</Link>
    </>
  );

  const authButtonsDesktop = user ? (
    <button
      onClick={handleLogout}
      className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition"
    >
      Logout
    </button>
  ) : (
    <>
      <Link to="/login" className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition">Login</Link>
      <Link to="/register" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Register</Link>
    </>
  );

  const authButtonsMobile = user ? (
    <button
      onClick={() => {
        handleLogout();
        setIsOpen(false);
      }}
      className="px-4 py-2 border border-red-500 text-red-600 rounded-lg text-center"
    >
      Logout
    </button>
  ) : (
    <>
      <Link to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg text-center">Login</Link>
      <Link to="/register" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-teal-500 text-white rounded-lg text-center">Register</Link>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-teal-600">Aspire Career Consultancy</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {menuLinks}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {authButtonsDesktop}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-teal-600 text-2xl focus:outline-none">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-4 py-2 space-y-2">
            {menuLinks}
            {authButtonsMobile}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
