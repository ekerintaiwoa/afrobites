import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import api from '../api';

const Home = () => {
    const { t, setIsResModalOpen } = useAppContext();
    const [featuredDishes, setFeaturedDishes] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ourStory, setOurStory] = useState(null);

    // Quick reservation state
    const [quickRes, setQuickRes] = useState({ date: new Date().toISOString().split('T')[0], time: '', guests: '2 guests', name: '', phone: '' });
    const [availabilityMsg, setAvailabilityMsg] = useState(null);
    const [availabilityAlts, setAvailabilityAlts] = useState([]);

    const handleCheckAvailability = () => {
        if (!quickRes.name || !quickRes.phone || !quickRes.date || !quickRes.time) {
            setAvailabilityMsg({ type: 'error', text: 'Please fill in date, time, name and phone.' });
            return;
        }
        api.post('check-availability/', quickRes)
            .then(res => {
                if(res.data.success) {
                    setAvailabilityMsg({ type: 'success', text: res.data.message });
                    setAvailabilityAlts([]);
                    setQuickRes({ ...quickRes, name: '', phone: '' }); // Reset fields
                } else {
                    setAvailabilityMsg({ type: 'error', text: res.data.message });
                    setAvailabilityAlts(res.data.alternatives || []);
                }
            })
            .catch(err => {
                setAvailabilityMsg({ type: 'error', text: 'An error occurred. Please try again.' });
                console.error(err);
            });
    };

    useEffect(() => {
        api.get('menu-items/')
            .then(res => {
                setFeaturedDishes(res.data.slice(0, 4));
            })
            .catch(err => console.error(err));

        api.get('reviews/')
            .then(res => {
                setReviews(res.data);
            })
            .catch(err => console.error(err));

        api.get('our-story/')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setOurStory(res.data[0]);
                }
            })
            .catch(err => console.error(err));
    }, []);

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
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Select your time, party size, and dining preference.</p>
                        
                        {availabilityMsg && (
                            <div style={{ padding: '12px', borderRadius: '8px', marginBottom: '16px', background: availabilityMsg.type === 'success' ? '#e6ffe6' : '#ffe6e6', color: availabilityMsg.type === 'success' ? 'green' : 'red', fontSize: '14px', fontWeight: 'bold' }}>
                                {availabilityMsg.text}
                            </div>
                        )}
                        {availabilityAlts.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px', fontWeight: 700 }}>Available alternatives:</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {availabilityAlts.map((alt, i) => (
                                        <div key={i} style={{ padding: '6px 12px', background: '#f0f0f0', borderRadius: '16px', fontSize: '12px', cursor: 'pointer', border: '1px solid #ddd' }} onClick={() => { setQuickRes({...quickRes, date: alt.date, time: alt.time}); setAvailabilityMsg(null); setAvailabilityAlts([]); }}>
                                            {alt.date} {alt.time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input placeholder="Full Name" value={quickRes.name} onChange={e => setQuickRes({...quickRes, name: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px' }} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input placeholder="Phone Number" value={quickRes.phone} onChange={e => setQuickRes({...quickRes, phone: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Date</label>
                                <input type="date" value={quickRes.date} onChange={e => setQuickRes({...quickRes, date: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Time</label>
                                <select value={quickRes.time} onChange={e => setQuickRes({...quickRes, time: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', appearance: 'none', background: 'white' }}>
                                    <option value="">Select</option><option value="12:00">12:00</option><option value="18:30">18:30</option><option value="20:00">20:00</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Guests</label>
                                <select value={quickRes.guests} onChange={e => setQuickRes({...quickRes, guests: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '12px', fontSize: '14px', appearance: 'none', background: 'white' }}>
                                    <option>2 guests</option><option>4 guests</option><option>6 guests</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            onClick={handleCheckAvailability}
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
                    {featuredDishes.map(dish => (
                        <div className="dish-card" key={dish.id} style={{ cursor: 'default' }}>
                            {dish.image && (
                                <div style={{ height: '220px', backgroundImage: `url(${dish.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}></div>
                            )}
                            <div className="dish-info">
                                <div className="dish-name">{dish.name}</div>
                                <div className="dish-desc">{dish.description || dish.desc}</div>
                                <div className="dish-footer"><span className="dish-price">€{parseFloat(dish.price).toFixed(2)}</span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section">
                <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
                    <div style={{ backgroundImage: `url(${ourStory?.image || 'https://images.unsplash.com/photo-1414235077428-338988a92215?auto=format&fit=crop&q=80&w=1200'})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', borderRadius: '24px' }}></div>
                    <div className="about-text">
                        <div className="section-tag">{ourStory ? ourStory.tag : t('about-tag')}</div>
                        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: ourStory ? ourStory.title : t('about-title') }}></h2>
                        <p className="section-sub" style={{ marginBottom: '40px' }}>{ourStory ? ourStory.subtitle : t('about-sub')}</p>
                        <div className="values" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="value-item"><strong>🌍</strong><div><div className="value-title">{ourStory ? ourStory.value1 : t('v1')}</div></div></div>
                            <div className="value-item"><strong>🌿</strong><div><div className="value-title">{ourStory ? ourStory.value2 : t('v2')}</div></div></div>
                            <div className="value-item"><strong>🚀</strong><div><div className="value-title">{ourStory ? ourStory.value3 : t('v3')}</div></div></div>
                            <div className="value-item"><strong>❤️</strong><div><div className="value-title">{ourStory ? ourStory.value4 : t('v4')}</div></div></div>
                        </div>
                    </div>
                </div>
            </section>

            {reviews.length > 0 && (
                <section className="section" style={{ background: '#f9f9f9', padding: '80px 5%' }}>
                    <div className="section-tag" style={{ textAlign: 'center' }}>Words of Love</div>
                    <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>What Our Guests Say</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {reviews.map(review => (
                            <div key={review.id} style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                <div style={{ display: 'flex', color: 'var(--orange)', marginBottom: '16px' }}>
                                    {[...Array(review.rating)].map((_, i) => <span key={i}>★</span>)}
                                </div>
                                <p style={{ fontSize: '16px', color: '#555', lineHeight: '1.6', marginBottom: '24px', fontStyle: 'italic' }}>"{review.text}"</p>
                                <div style={{ fontWeight: 800, fontSize: '14px' }}>{review.author}</div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
