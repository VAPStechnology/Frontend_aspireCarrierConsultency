import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${isActive ? 'text-red-600' : 'text-gray-700 hover:text-teal-500'}`;
  const DashLinkClass = ({ isActive }) =>
    `font-medium transition ${isActive ? 'text-blue-500' : 'text-gray-700 hover:text-teal-500'}`;

  const menuLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/services" className={navLinkClass}>Services</NavLink>
      <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
      <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
      {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
      {user?.isAdmin === true && <NavLink to="/admin/dashboard" className={navLinkClass}>Admin Dashboard</NavLink>}
      {user && <NavLink to="/dashboard/agreement" className={DashLinkClass}>Agreement</NavLink>}
      {user && <NavLink to="/dashboard/submit-700-forms" className={DashLinkClass}>700-Forms</NavLink>}
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
      <NavLink to="/login" className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition">Login</NavLink>
      <NavLink to="/register" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">Register</NavLink>
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
      <NavLink to="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-teal-500 text-teal-600 rounded-lg text-center">Login</NavLink>
      <NavLink to="/register" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-teal-500 text-white rounded-lg text-center">Register</NavLink>
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
