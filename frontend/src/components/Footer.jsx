import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--black)', color: '#888', padding: '60px 5% 30px' }}>
            <div className="footer-grid" style={{ display: 'grid', gap: '40px', marginBottom: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div>
                    <img src="/images/logo.png" alt="Logo" style={{ height: '48px', marginBottom: '16px', display: 'none' }} onError={(e) => { e.target.style.display = 'none' }} />
                    <h2 style={{ color: 'var(--orange)', marginBottom: '10px' }}>King's Afro Bites</h2>
                    <p className="footer-tagline" style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', maxWidth: '280px' }}>
                        Authentic West African cuisine delivered to your door in Hamburg. Bold flavors, real ingredients, made with love.
                    </p>
                </div>
                <div className="footer-col">
                    <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--white)', marginBottom: '20px' }}>Menu</h5>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '10px' }}><Link to="/menu" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>All Dishes</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/menu" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Burgers</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/menu" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Rice Dishes</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--white)', marginBottom: '20px' }}>Company</h5>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>About Us</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/blog" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Blog</Link></li>
                        <li style={{ marginBottom: '10px' }}><Link to="/contact" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h5 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--white)', marginBottom: '20px' }}>Contact</h5>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '10px' }}><a href="tel:+4915775167689" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>+49 157 7516 7689</a></li>
                        <li style={{ marginBottom: '10px' }}><a href="mailto:hello@kingsafrobites.com" style={{ color: '#666', textDecoration: 'none', fontSize: '14px' }}>hello@kingsafrobites.com</a></li>
                        <li style={{ marginBottom: '10px' }}><span style={{ color: '#666', fontSize: '14px' }}>Hamburg, Germany</span></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom" style={{ borderTop: '1px solid #1a1a1a', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <span className="footer-copy" style={{ fontSize: '13px' }}>© 2026 King's Afro Bites®. All rights reserved.</span>
                <span style={{ color: '#333', fontSize: '13px' }}>Made with ❤️ in Hamburg</span>
            </div>
        </footer>
    );
};

export default Footer;
