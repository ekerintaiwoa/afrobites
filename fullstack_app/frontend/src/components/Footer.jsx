import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="section" style={{ backgroundColor: 'var(--black)', color: '#888', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px', marginBottom: '60px' }}>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center font-black text-white">K</div>
              <span className="font-bold text-white tracking-tight">King's Afro Bites</span>
            </div>
            <p style={{ lineHeight: '1.8', fontSize: '15px' }}>
              Authentic West African cuisine served with love in Hamburg. From smoky Jollof to hearty Fufu, discover the real taste of home.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-6" style={{ fontSize: '13px' }}>Quick Links</h5>
            <div className="flex flex-col gap-4">
              <NavLink to="/menu" className="hover:text-orange">All Dishes</NavLink>
              <NavLink to="/blog" className="hover:text-orange">Our Stories</NavLink>
              <NavLink to="/contact" className="hover:text-orange">Visit Us</NavLink>
              <NavLink to="/" className="hover:text-orange">Reservations</NavLink>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-6" style={{ fontSize: '13px' }}>Reach Out</h5>
            <div className="flex flex-col gap-4">
              <a href="tel:+4915775167689" className="flex items-center gap-3 hover:text-white">
                <Phone size={18} /> +49 157 7516 7689
              </a>
              <a href="mailto:hello@kingsafrobites.com" className="flex items-center gap-3 hover:text-white">
                <Mail size={18} /> hello@kingsafrobites.com
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={18} /> Hamburg, Germany
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-widest mb-6" style={{ fontSize: '13px' }}>Follow Us</h5>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center hover:bg-orange hover:text-black transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl glass-dark flex items-center justify-center hover:bg-orange hover:text-black transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ fontSize: '13px' }}>© 2026 King's Afro Bites®. All rights reserved.</p>
          <p style={{ fontSize: '13px' }}>Made with ❤️ for authentic African cuisine</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
