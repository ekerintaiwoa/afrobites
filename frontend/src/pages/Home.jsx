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
            <section className="hero">
                <div className="container" style={{ display: 'flex', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1, width: '100%', flexWrap: 'wrap' }}>
                    {/* Left Side: Content */}
                    <div className="hero-content" style={{ flex: '1.2', minWidth: '320px' }}>
                        <div className="hero-tag">
                            <span></span>
                            {t('hero-tag')}
                        </div>
                        <h1 className="hero-title">
                            Reserve a table for bold African flavours.
                        </h1>
                        <p className="hero-sub">
                            King's Afro Bites brings a warm, modern dining experience built around Ghanaian and West African classics. Discover signature dishes, pre-order favourites, and book your table in seconds.
                        </p>
                        <div className="hero-btns">
                            <button className="btn-primary" onClick={() => setIsResModalOpen(true)}>{t('cta-order')}</button>
                            <Link to="/menu" className="btn-outline">{t('cta-menu')}</Link>
                        </div>
                    </div>

                    {/* Right Side: Quick Reservation Card */}
                    <div className="quick-res-card">
                        <h3>Quick reservation</h3>
                        <p>Select your time, party size, and dining preference.</p>
                        
                        {availabilityMsg && (
                            <div className={`availability-msg ${availabilityMsg.type}`}>
                                {availabilityMsg.text}
                            </div>
                        )}
                        {availabilityAlts.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ fontSize: '13px', color: '#555', marginBottom: '8px', fontWeight: 700 }}>Available alternatives:</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {availabilityAlts.map((alt, i) => (
                                        <div key={i} className="alt-pill" onClick={() => { setQuickRes({...quickRes, date: alt.date, time: alt.time}); setAvailabilityMsg(null); setAvailabilityAlts([]); }}>
                                            {alt.date} {alt.time}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="quick-res-grid">
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input placeholder="Full Name" className="quick-res-input" value={quickRes.name} onChange={e => setQuickRes({...quickRes, name: e.target.value})} />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <input placeholder="Phone Number" className="quick-res-input" value={quickRes.phone} onChange={e => setQuickRes({...quickRes, phone: e.target.value})} />
                            </div>
                            <div>
                                <label className="quick-res-label">Date</label>
                                <input type="date" className="quick-res-input" value={quickRes.date} onChange={e => setQuickRes({...quickRes, date: e.target.value})} />
                            </div>
                            <div>
                                <label className="quick-res-label">Time</label>
                                <select className="quick-res-input" value={quickRes.time} onChange={e => setQuickRes({...quickRes, time: e.target.value})}>
                                    <option value="">Select</option><option value="12:00">12:00</option><option value="18:30">18:30</option><option value="20:00">20:00</option>
                                </select>
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label className="quick-res-label">Guests</label>
                                <select className="quick-res-input" value={quickRes.guests} onChange={e => setQuickRes({...quickRes, guests: e.target.value})}>
                                    <option>2 guests</option><option>4 guests</option><option>6 guests</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={handleCheckAvailability} className="quick-res-btn">
                            Check availability
                        </button>
                        
                        <p style={{ color: '#999', fontSize: '12px', lineHeight: '1.5' }}>
                            You can also add occasion notes, allergies, and pre-order dishes in the <span style={{ color: 'var(--orange)', cursor: 'pointer' }} onClick={() => setIsResModalOpen(true)}>full booking form</span>.
                        </p>
                    </div>
                </div>

                <div className="hero-scroll">
                    <span>Scroll</span>
                </div>
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
                <div className="about-grid">
                    <div className="about-img" style={{ backgroundImage: `url(${ourStory?.image || 'https://images.unsplash.com/photo-1414235077428-338988a92215?auto=format&fit=crop&q=80&w=1200'})` }}></div>
                    <div className="about-text">
                        <div className="section-tag">{ourStory ? ourStory.tag : t('about-tag')}</div>
                        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: ourStory ? ourStory.title : t('about-title') }}></h2>
                        <p className="section-sub" style={{ marginBottom: '40px' }}>{ourStory ? ourStory.subtitle : t('about-sub')}</p>
                        <div className="values" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="value-item"><strong>🌍</strong><div className="value-title">{ourStory ? ourStory.value1 : t('v1')}</div></div>
                            <div className="value-item"><strong>🌿</strong><div className="value-title">{ourStory ? ourStory.value2 : t('v2')}</div></div>
                            <div className="value-item"><strong>🚀</strong><div className="value-title">{ourStory ? ourStory.value3 : t('v3')}</div></div>
                            <div className="value-item"><strong>❤️</strong><div className="value-title">{ourStory ? ourStory.value4 : t('v4')}</div></div>
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
