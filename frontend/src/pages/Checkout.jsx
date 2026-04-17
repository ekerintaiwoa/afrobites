import React from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, getSubtotal } = useAppContext();
    const navigate = useNavigate();

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        alert('Order placed successfully (mock)!');
        // Later will integrate with Django backend
        navigate('/');
    };

    return (
        <div className="page active" style={{ display: 'block' }}>
            <h1 className="form-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, marginBottom: '32px' }}>Complete Your Order</h1>
            <div className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
                <form onSubmit={handlePlaceOrder}>
                    <div className="form-group" style={{ marginBottom: '20px' }}><label>Full Name</label><input type="text" placeholder="e.g. Kofi Mensah" style={{ width: '100%', padding: '14px 18px', border: '2px solid #e8e8e8', borderRadius: '12px', fontSize: '15px' }} required /></div>
                    <div className="form-group" style={{ marginBottom: '20px' }}><label>Email Address</label><input type="email" placeholder="hello@email.com" style={{ width: '100%', padding: '14px 18px', border: '2px solid #e8e8e8', borderRadius: '12px', fontSize: '15px' }} required /></div>
                    <div className="form-group" style={{ marginBottom: '20px' }}><label>Phone Number</label><input type="tel" placeholder="+49 157 ..." style={{ width: '100%', padding: '14px 18px', border: '2px solid #e8e8e8', borderRadius: '12px', fontSize: '15px' }} required /></div>
                    <div className="form-group" style={{ marginBottom: '20px' }}><label>Delivery Address</label><input type="text" placeholder="Street, House Number, Hamburg" style={{ width: '100%', padding: '14px 18px', border: '2px solid #e8e8e8', borderRadius: '12px', fontSize: '15px' }} required /></div>
                    <div className="form-group" style={{ marginBottom: '20px' }}><label>Delivery Note</label><textarea placeholder="Ring doorbell..." style={{ width: '100%', padding: '14px 18px', border: '2px solid #e8e8e8', borderRadius: '12px', fontSize: '15px', height: '100px' }}></textarea></div>
                    <button type="submit" style={{ width: '100%', background: 'var(--orange)', color: 'var(--black)', border: 'none', padding: '18px', borderRadius: '14px', fontWeight: 800, fontSize: '16px', cursor: 'pointer', marginTop: '24px' }}>🍽️ Place Order</button>
                </form>

                <div className="order-summary-box" style={{ background: 'var(--black)', color: 'var(--white)', borderRadius: '24px', padding: '32px', position: 'sticky', top: '100px' }}>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '24px' }}>Order Summary</h4>
                    {cart.map(item => (
                        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#aaa' }}>
                            <span>{item.qty}x {item.name}</span>
                            <span style={{ color: '#fff', fontWeight: 600 }}>€{(item.price * item.qty).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="order-sum-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#aaa' }}><span>Subtotal</span><span style={{ color: '#fff', fontWeight: 600 }}>€{getSubtotal().toFixed(2)}</span></div>
                    <div className="order-sum-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#aaa' }}><span>Delivery</span><span style={{ color: '#fff', fontWeight: 600 }}>€2.99</span></div>
                    <div className="order-sum-total" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #333', fontWeight: 800, fontSize: '18px' }}>
                        <span>Total</span><span style={{ color: 'var(--orange)' }}>€{(getSubtotal() + (cart.length ? 2.99 : 0)).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
