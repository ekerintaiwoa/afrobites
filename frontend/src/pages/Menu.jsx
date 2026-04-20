import React, { useState, useEffect } from 'react';
import api from '../api';

const Menu = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="page" style={{ paddingTop: '120px' }}>
            <div className="section-tag" style={{ color: 'var(--orange)', fontWeight: 'bold' }}>Full Menu</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '8px' }}>Everything We Cook</h1>
            <p style={{ color: '#888', marginBottom: '40px', fontSize: '16px' }}>Scroll through our authentic Ghanaian menu. All dishes made fresh to order.</p>

            {categories.map((cat) => (
                <div className="menu-cat" key={cat.id} style={{ marginBottom: '60px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, marginBottom: '20px', borderBottom: '2px solid var(--orange)', display: 'inline-block' }}>{cat.name}</h3>
                    <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                        {cat.items && cat.items.map(item => (
                            <div className="dish-card" key={item.id} style={{ background: 'var(--white)', border: '1px solid #e8e8e8', cursor: 'default' }}>
                                {item.image && (
                                    <div style={{ height: '180px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}></div>
                                )}
                                <div className="dish-info">
                                    <div className="dish-name" style={{ color: 'var(--black)' }}>{item.name}</div>
                                    <div className="dish-desc" style={{ color: '#888' }}>{item.description || item.desc}</div>
                                    <div className="dish-footer" style={{ marginTop: '10px' }}>
                                        <span className="dish-price" style={{ color: 'var(--black)' }}>€{parseFloat(item.price).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
