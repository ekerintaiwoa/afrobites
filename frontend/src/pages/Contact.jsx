import React from 'react';

const Contact = () => {
    return (
        <div className="page active" style={{ display: 'block' }}>
            <div className="section-tag">Get in Touch</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900 }}>We're in Hamburg,<br />Ready to Serve You</h1>
            <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center', marginTop: '60px' }}>
                <div>
                    <div className="contact-info" style={{ marginTop: '40px' }}>
                        <div className="contact-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
                            <div className="contact-icon" style={{ width: '50px', height: '50px', background: '#fff8ee', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>📍</div>
                            <div><div className="contact-label" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#aaa', marginBottom: '4px' }}>Location</div><div className="contact-value" style={{ fontSize: '16px', fontWeight: 600 }}>Hamburg, Germany</div></div>
                        </div>
                        <div className="contact-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
                            <div className="contact-icon" style={{ width: '50px', height: '50px', background: '#fff8ee', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>📞</div>
                            <div><div className="contact-label" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#aaa', marginBottom: '4px' }}>Phone</div><div className="contact-value" style={{ fontSize: '16px', fontWeight: 600 }}><a href="tel:+4915775167689" style={{ color: 'inherit', textDecoration: 'none' }}>+49 157 7516 7689</a></div></div>
                        </div>
                        <div className="contact-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
                            <div className="contact-icon" style={{ width: '50px', height: '50px', background: '#fff8ee', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>✉️</div>
                            <div><div className="contact-label" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#aaa', marginBottom: '4px' }}>Email</div><div className="contact-value" style={{ fontSize: '16px', fontWeight: 600 }}><a href="mailto:hello@kingsafrobites.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@kingsafrobites.com</a></div></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="map-placeholder" style={{ background: '#f0f0f0', borderRadius: '24px', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: '#ccc' }}>🗺️</div>
                    <p style={{ textAlign: 'center', marginTop: '16px', color: '#aaa', fontSize: '14px' }}>King's Afro Bites — Hamburg, Germany</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
