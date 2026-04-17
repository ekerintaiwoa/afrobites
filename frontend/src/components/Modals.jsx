import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import ReservationModal from './ReservationModal';

const Modals = () => {
    const { cart, removeFromCart, updateQty, getSubtotal, isCartOpen, setIsCartOpen, isResModalOpen, setIsResModalOpen } = useAppContext();

    return (
        <>
            {/* Cart Sidebar */}
            <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} style={{ display: isCartOpen ? 'block' : 'none' }}></div>
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} style={{ transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)' }}>
                <div className="cart-header">
                    <h3>Your Selection</h3>
                    <button className="cart-close" onClick={() => setIsCartOpen(false)}>✕</button>
                </div>
                <div className="cart-items" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>Cart is empty</div>
                    ) : (
                        cart.map(item => (
                            <div key={item.name} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
                                <div style={{ fontWeight: 600, fontSize: '14px', flex: 1 }}>{item.name}</div>
                                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--orange)' }}>€{(item.price * item.qty).toFixed(2)}</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <button onClick={() => updateQty(item.name, -1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', background: 'none', cursor: 'pointer' }}>-</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.name, 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', background: 'none', cursor: 'pointer' }}>+</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="cart-footer" style={{ padding: '20px 24px', borderTop: '1px solid #eee' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}><span>Subtotal</span><span>€{getSubtotal().toFixed(2)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}><span>Delivery</span><span>€2.99</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '18px', borderTop: '2px solid #eee', paddingTop: '12px', marginTop: '12px' }}><span>Total</span><span style={{ color: 'var(--orange)' }}>€{(getSubtotal() + (cart.length ? 2.99 : 0)).toFixed(2)}</span></div>
                    </div>
                    <Link to="/checkout" onClick={() => setIsCartOpen(false)} style={{ display: 'block', width: '100%', background: 'var(--black)', color: 'var(--white)', border: 'none', padding: '16px', borderRadius: '14px', fontWeight: 700, fontSize: '16px', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>Proceed to Checkout</Link>
                </div>
            </div>

            {/* Advanced Reservation Modal */}
            <ReservationModal isOpen={isResModalOpen} onClose={() => setIsResModalOpen(false)} />
        </>
    );
};

export default Modals;
