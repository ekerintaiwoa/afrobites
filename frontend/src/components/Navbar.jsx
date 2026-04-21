import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
    const { lang, toggleLang, setIsResModalOpen, t } = useAppContext();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <nav>
                <div className="nav-inner">
                    <Link to="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
                        <img src="/images/logo.png" alt="King's Afro Bites" style={{ height: '48px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
                    </Link>
                    <ul className="nav-links" style={{ display: 'flex', gap: '36px', listStyle: 'none' }}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                    <div className="nav-actions">
                        <button className="lang-toggle" onClick={toggleLang}>
                            {lang === 'en' ? '🇩🇪 DE' : '🇬🇧 EN'}
                        </button>
                        <button className="cart-btn" onClick={() => setIsResModalOpen(true)}>
                            {t('cta-order')}
                        </button>
                        <button className="hamburger" style={{ display: 'none' }} onClick={() => setMobileOpen(!mobileOpen)}>
                            <span></span><span></span><span></span>
                        </button>
                    </div>
                </div>
            </nav>
            {mobileOpen && (
                <div className="mobile-menu" style={{ display: 'block', position: 'fixed', top: '72px', left: '0', right: '0', background: 'var(--black)', padding: '20px 5%', zIndex: 999 }}>
                    <ul className="nav-links" style={{ flexDirection: 'column', listStyle: 'none' }}>
                        <li style={{ borderBottom: '1px solid #1a1a1a' }}><Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '16px 0', color: '#ccc' }}>Home</Link></li>
                        <li style={{ borderBottom: '1px solid #1a1a1a' }}><Link to="/menu" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '16px 0', color: '#ccc' }}>Menu</Link></li>
                        <li style={{ borderBottom: '1px solid #1a1a1a' }}><Link to="/blog" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '16px 0', color: '#ccc' }}>Blog</Link></li>
                        <li style={{ borderBottom: '1px solid #1a1a1a' }}><Link to="/contact" onClick={() => setMobileOpen(false)} style={{ display: 'block', padding: '16px 0', color: '#ccc' }}>Contact</Link></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
