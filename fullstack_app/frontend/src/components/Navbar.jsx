import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Calendar } from 'lucide-react';

const Navbar = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed transition-all duration-300 ${isScrolled ? 'glass-dark py-3 shadow-lg' : 'bg-transparent py-5'} w-full top-0 left-0 right-0 z-50`}>
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center font-black text-white">K</div>
          <span className="font-bold text-white tracking-tight">King's Afro Bites</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="md-flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `font-bold uppercase tracking-widest transition-all ${isActive ? 'text-orange' : 'text-white'}`
              }
              style={{ fontSize: '13px' }}
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={onOpenBooking}
            className="flex items-center gap-2 bg-orange text-black font-bold px-6 py-3 rounded-full transition-all"
          >
            <Calendar size={18} />
            Book a Table
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md-hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md-hidden absolute transition-all duration-300 ${isMobileMenuOpen ? 'flex' : 'hidden'} glass-dark w-full left-0 top-full flex-col`}>
        <div className="container py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `font-bold uppercase tracking-widest ${isActive ? 'text-orange' : 'text-white'}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="flex items-center justify-center gap-2 bg-orange text-black font-bold px-6 py-4 rounded-xl"
          >
            <Calendar size={20} />
            Book a Table
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
