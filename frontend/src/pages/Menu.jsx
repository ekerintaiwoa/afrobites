import React from 'react';
import { useAppContext } from '../context/AppContext';

const categories = [
    {
        title: '🍔 Afro Burgers',
        items: [
            { name: 'Afro Beef Burger', desc: 'Juicy beef patty seasoned with West African spices.', price: 10.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600' },
            { name: 'Afro Chicken Burger', desc: 'Crispy fried chicken breast marinated in West African spices.', price: 10.90, image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?auto=format&fit=crop&q=80&w=600' },
            { name: 'Afro Vegan Burger', desc: 'Plant-based patty with black-eyed bean base.', price: 9.90, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=600' },
            { name: 'Krusty Fried Chicken', desc: 'Our signature crispy-coated whole fried chicken pieces.', price: 11.90, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=600' },
        ]
    },
    {
        title: '🍟 Sides & Snacks',
        items: [
            { name: 'Spicy Chicken Wings', desc: '6 crispy wings tossed in our signature West African pepper rub.', price: 8.90, image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=600' },
            { name: 'Fries', desc: 'Golden crispy fries seasoned with our house spice blend.', price: 3.50, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600' },
            { name: 'Jolly-Belly', desc: 'Grilled chicken breast chunks served on a fresh garden salad.', price: 11.90, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600' },
        ]
    },
    {
        title: '🇬🇭 Ghanaian Classics',
        items: [
            { name: 'Ghana Jollof', desc: 'Slow-cooked tomato rice in a rich tomato-pepper base.', price: 12.90, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600' },
            { name: 'Waakye', desc: 'Rice and black-eyed beans cooked with sorghum leaves.', price: 11.90, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600' },
            { name: 'Fufu & Light Soup', desc: 'Hand-pounded cassava and green plantain fufu.', price: 13.90, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=600' },
            { name: 'Banku & Okro Soup', desc: 'Fermented corn and cassava dumplings with okro stew.', price: 13.90, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600' },
            { name: 'Banku & Tilapia', desc: 'Classic Ghanaian comfort — fermented corn banku balls with grilled tilapia.', price: 14.90, image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=600' },
        ]
    }
];

const Menu = () => {
    const { addToCart } = useAppContext();

    return (
        <div className="page" style={{ paddingTop: '120px' }}>
            <div className="section-tag" style={{ color: 'var(--orange)', fontWeight: 'bold' }}>Full Menu</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '8px' }}>Everything We Cook</h1>
            <p style={{ color: '#888', marginBottom: '40px', fontSize: '16px' }}>Scroll through our authentic Ghanaian menu. All dishes made fresh to order.</p>

            {categories.map((cat, idx) => (
                <div className="menu-cat" key={idx} style={{ marginBottom: '60px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, marginBottom: '20px', borderBottom: '2px solid var(--orange)', display: 'inline-block' }}>{cat.title}</h3>
                    <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                        {cat.items.map(item => (
                            <div className="dish-card" key={item.name} style={{ background: 'var(--white)', border: '1px solid #e8e8e8' }} onClick={() => addToCart(item)}>
                                <div style={{ height: '180px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}></div>
                                <div className="dish-info">
                                    <div className="dish-name" style={{ color: 'var(--black)' }}>{item.name}</div>
                                    <div className="dish-desc" style={{ color: '#888' }}>{item.desc}</div>
                                    <div className="dish-footer" style={{ marginTop: '10px' }}>
                                        <span className="dish-price" style={{ color: 'var(--black)' }}>€{item.price.toFixed(2)}</span>
                                        <button className="add-btn" style={{ background: 'var(--black)', color: 'var(--white)' }} onClick={(e) => { e.stopPropagation(); addToCart(item); }}>+ Add to Cart</button>
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
