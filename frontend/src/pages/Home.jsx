import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { t, addToCart, setIsResModalOpen } = useAppContext();

    return (
        <div id="home-page" className="page active" style={{ padding: '0', minHeight: 'auto' }}>
            <section className="hero" style={{ minHeight: '100vh', background: 'var(--black)', display: 'flex', alignItems: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ display: 'flex', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%', flexWrap: 'wrap' }}>
                    {/* Left Side: Content */}
                    <div className="hero-content" style={{ flex: '1.2', minWidth: '320px' }}>
                        <div className="hero-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #333', color: 'var(--orange)', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', padding: '8px 18px', borderRadius: '20px', marginBottom: '32px' }}>
                            <span style={{ width: '6px', height: '6px', background: 'var(--orange)', borderRadius: '50%' }}></span>
                            {t('hero-tag')}
                        </div>
                        <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--white)', marginBottom: '28px' }}>
                            Reserve a table for bold African flavours.
                        </h1>
                        <p className="hero-sub" style={{ fontSize: '18px', color: '#aaa', lineHeight: 1.7, marginBottom: '48px', maxWidth: '500px' }}>
                            King's Afro Bites brings a warm, modern dining experience built around Ghanaian and West African classics. Discover signature dishes, pre-order favourites, and book your table in seconds.
                        </p>
                        <div className="hero-btns" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <button className="btn-primary" onClick={() => setIsResModalOpen(true)} style={{ background: 'var(--orange)', color: 'var(--black)', padding: '16px 36px', borderRadius: '50px', fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer' }}>{t('cta-order')}</button>
                            <Link to="/menu" className="btn-outline" style={{ background: 'transparent', color: 'var(--white)', padding: '16px 36px', borderRadius: '50px', fontWeight: 600, fontSize: '15px', textDecoration: 'none', border: '2px solid #333' }}>{t('cta-menu')}</Link>
                        </div>
                    </div>

                    {/* Right Side: Quick Reservation Card */}
                    <div className="quick-res-card" style={{ flex: '1', minWidth: '360px', background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', animation: 'slideRight 0.8s ease-out' }}>
                        <h3 style={{ color: 'var(--black)', fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>Quick reservation</h3>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px' }}>Select your time, party size, and dining preference.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Date</label>
                                <input type="date" style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px' }} defaultValue={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Time</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', appearance: 'none', background: 'white' }}>
                                    <option>Select</option><option>12:00</option><option>18:30</option><option>20:00</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Guests</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', appearance: 'none', background: 'white' }}>
                                    <option>2 guests</option><option>4 guests</option><option>6 guests</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '8px' }}>Seating</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', appearance: 'none', background: 'white' }}>
                                    <option>Window seat</option><option>Indoor</option><option>Outdoor</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsResModalOpen(true)}
                            style={{ width: '100%', background: 'var(--orange)', color: 'var(--black)', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}
                        >
                            Check availability
                        </button>
                        
                        <p style={{ color: '#999', fontSize: '12px', lineHeight: '1.5' }}>
                            You can also add occasion notes, allergies, and pre-order dishes in the <span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => setIsResModalOpen(true)}>full booking form</span>.
                        </p>
                    </div>
                </div>

                <div className="hero-scroll" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#333', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    <span>Scroll</span>
                </div>
                
                <style>{`
                    @keyframes slideRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
                    @media (max-width: 900px) { .container { flex-direction: column !important; gap: 40px !important; } .quick-res-card { width: 100% !important; min-width: auto !important; } }
                `}</style>
            </section>

            {/* Floating Contact/Booking Actions */}
            <div className="sticky-order">
                <button 
                    className="sticky-wa" 
                    onClick={() => window.open('https://wa.me/4915775167689', '_blank')}
                    title="Chat on WhatsApp"
                    style={{ fontSize: '24px' }}
                >
                    💬
                </button>
                <button className="sticky-order-btn" onClick={() => setIsResModalOpen(true)}>
                   📅 Book a Table
                </button>
            </div>

            <div className="stats-strip">
                <div className="stat"><div className="stat-num">500+</div><div className="stat-label">{t('stat1')}</div></div>
                <div className="stat"><div className="stat-num">12+</div><div className="stat-label">{t('stat2')}</div></div>
                <div className="stat"><div className="stat-num">5 min</div><div className="stat-label">{t('stat3')}</div></div>
                <div className="stat"><div className="stat-num">4.9★</div><div className="stat-label">{t('stat4')}</div></div>
            </div>

            <section className="section featured" style={{ background: 'var(--black)' }}>
                <div className="section-tag" style={{ color: 'var(--white)' }}>{t('feat-tag')}</div>
                <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('feat-title') }} style={{ color: 'var(--white)' }}></h2>
                <p className="section-sub" style={{ color: '#777' }}>{t('feat-sub')}</p>
                <div className="dishes-grid">
                    {[
                        { name: 'Ghana Jollof', price: 12.90, desc: 'Smoky, perfectly spiced tomato rice with grilled chicken — the crown jewel of Ghanaian cuisine.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
                        { name: 'Waakye', price: 11.90, desc: 'Ghana\'s legendary rice & beans dish served with fried fish, spaghetti, egg, and rich stew.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800' },
                        { name: 'Fufu & Light Soup', price: 13.90, desc: 'Silky pounded cassava & plantain with aromatic chicken light soup — a Ghanaian soul food classic.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800' },
                        { name: 'Afro Burgers', price: 9.90, desc: 'Beef, chicken or vegan — all loaded with West African spices, fresh greens and our signature Afro sauce on a brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800' }
                    ].map(dish => (
                        <div className="dish-card" key={dish.name} onClick={() => addToCart({ name: dish.name, price: dish.price })}>
                            <div style={{ height: '220px', backgroundImage: `url(${dish.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}></div>
                            <div className="dish-info">
                                <div className="dish-name">{dish.name}</div>
                                <div className="dish-desc">{dish.desc}</div>
                                <div className="dish-footer"><span className="dish-price">€{dish.price.toFixed(2)}</span><button className="add-btn" onClick={(e) => { e.stopPropagation(); addToCart({ name: dish.name, price: dish.price }); }}>+ Add</button></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338988a92215?auto=format&fit=crop&q=80&w=1200)', backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', borderRadius: '24px' }}></div>
                    <div className="about-text">
                        <div className="section-tag">{t('about-tag')}</div>
                        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('about-title') }}></h2>
                        <p className="section-sub" style={{ marginBottom: '40px' }}>{t('about-sub')}</p>
                        <div className="values" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="value-item"><strong>🌍</strong><div><div className="value-title">{t('v1')}</div></div></div>
                            <div className="value-item"><strong>🌿</strong><div><div className="value-title">{t('v2')}</div></div></div>
                            <div className="value-item"><strong>🚀</strong><div><div className="value-title">{t('v3')}</div></div></div>
                            <div className="value-item"><strong>❤️</strong><div><div className="value-title">{t('v4')}</div></div></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
