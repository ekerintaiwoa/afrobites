import React, { useState } from 'react';
import { X, CheckCircle, MessageSquare } from 'lucide-react';
import api from '../api';

const ReservationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    party_size: 2,
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    seating_preference: 'Indoor',
    occasion: 'Casual dinner',
    preorder_dish: 'No pre-order',
    allergies: '',
    special_request: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('reservations/', formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hello King's Afro Bites! I'd like to reserve a table:
- Name: ${formData.full_name}
- Date: ${formData.date}
- Time: ${formData.time}
- Guests: ${formData.party_size}
- Occasion: ${formData.occasion}
${formData.special_request ? `- Request: ${formData.special_request}` : ''}`;
    
    window.open(`https://wa.me/4915775167689?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      {/* Overlay */}
      <div 
        className="animate-fade-in" 
        onClick={onClose}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: -1 }}
      ></div>
      
      {/* Modal Container */}
      <div 
        className="animate-slide-up" 
        style={{ 
          position: 'relative',
          width: '100%',
          maxWidth: '672px',
          backgroundColor: '#fff', 
          borderRadius: '24px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', borderBottom: '1px solid #f3f4f6' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 900, color: '#000', fontFamily: "'Playfair Display', serif", margin: 0 }}>Complete your reservation</h3>
          <button onClick={onClose} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="custom-scrollbar" style={{ padding: '32px', overflowY: 'auto' }}>
          {isSuccess ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', backgroundColor: '#f0fdf4', color: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <CheckCircle size={40} />
              </div>
              <h4 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', color: '#000' }}>Reservation Captured!</h4>
              <p style={{ color: '#6b7280', maxWidth: '320px', lineHeight: 1.5 }}>We have received your request, {formData.full_name}. See you on {formData.date}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-item">
                  <label className="label-style">Full Name</label>
                  <input name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="e.g. Kofi Mensah" className="light-input" />
                </div>
                <div className="form-item">
                  <label className="label-style">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+49 123 ..." className="light-input" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-item">
                  <label className="label-style">Email</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="kofi@example.com" className="light-input" />
                </div>
                <div className="form-item">
                  <label className="label-style">Party Size</label>
                  <select name="party_size" value={formData.party_size} onChange={handleChange} className="light-input">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-item">
                  <label className="label-style">Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="light-input" />
                </div>
                <div className="form-item">
                  <label className="label-style">Time</label>
                  <select name="time" value={formData.time} onChange={handleChange} required className="light-input">
                    {['12:00', '13:00', '14:00', '17:30', '18:30', '19:30', '20:30'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-item">
                  <label className="label-style">Seating Preference</label>
                  <select name="seating_preference" value={formData.seating_preference} onChange={handleChange} className="light-input">
                    <option>Indoor</option><option>Window view</option><option>Terrace</option>
                  </select>
                </div>
                <div className="form-item">
                  <label className="label-style">Occasion</label>
                  <select name="occasion" value={formData.occasion} onChange={handleChange} className="light-input">
                    <option>Casual dinner</option><option>Birthday</option><option>Business</option><option>Anniversary</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div className="form-item">
                  <label className="label-style">Pre-order a Dish</label>
                  <select name="preorder_dish" value={formData.preorder_dish} onChange={handleChange} className="light-input">
                    <option>No pre-order</option><option>Ghana Jollof</option><option>Waakye</option><option>Fufu & Soup</option>
                  </select>
                </div>
                <div className="form-item">
                  <label className="label-style">Allergies</label>
                  <input name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Peanuts, seafood, gluten, none" className="light-input" />
                </div>
              </div>

              <div className="form-item">
                <label className="label-style">Special Request</label>
                <textarea 
                  name="special_request" 
                  value={formData.special_request} 
                  onChange={handleChange} 
                  placeholder="Window seat, birthday candle, stroller space, large-group details..."
                  className="light-input"
                  style={{ minHeight: '100px', resize: 'vertical' }}
                ></textarea>
              </div>

              {/* Actions */}
              <div className="res-actions">
                <button type="submit" disabled={isSubmitting} className="res-btn btn-confirm">
                  {isSubmitting ? 'Securing...' : 'Confirm reservation'}
                </button>
                <button type="button" onClick={handleWhatsApp} className="res-btn btn-whatsapp">
                  <MessageSquare size={20} /> Reserve via WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
        
        .label-style {
          display: block;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 8px;
        }

        .light-input {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 16px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 12px;
          font-size: 15px;
          color: #000;
          outline: none;
          transition: border-color 0.2s;
        }
        .light-input:focus { border-color: var(--orange); }

        .res-actions { display: flex; gap: 16px; margin-top: 10px; }
        .res-btn {
          flex: 1;
          padding: 16px;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: opacity 0.2s;
          border: none;
          font-size: 15px;
        }
        .btn-confirm { background: #F5A623; color: #000; }
        .btn-whatsapp { background: #000; color: #fff; }
        .res-btn:hover { opacity: 0.9; }

        .animate-fade-in { animation: fadeIn 0.3s ease; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        @media(max-width: 640px) {
          .res-actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default ReservationModal;
