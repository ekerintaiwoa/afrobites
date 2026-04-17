import React, { useState } from 'react';
import { X, Calendar, Users, Clock, Info, Heart, CheckCircle } from 'lucide-react';
import axios from '../api/axios';

const ReservationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    party_size: 2,
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    seating_preference: 'No preference',
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
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('reservations/', formData);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black opacity-70" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in" style={{ backgroundColor: '#fff', borderRadius: '28px' }}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Complete your reservation</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[80vh]">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={48} />
              </div>
              <h4 className="text-3xl font-bold mb-4">Reservation Captured!</h4>
              <p className="text-gray-600 text-lg">Thank you, {formData.full_name}. We look forward to seeing you on {formData.date} at {formData.time}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="full_name" value={formData.full_name} onChange={handleChange} required placeholder="Kofi Mensah" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="+49 157 ..." />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="hello@email.com" />
                </div>
                <div className="form-group">
                  <label>Party Size</label>
                  <select name="party_size" value={formData.party_size} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}
                    <option value="12">7+ guests (Enquiry)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <select name="time" value={formData.time} onChange={handleChange} required>
                    <option>12:00</option><option>13:00</option><option>14:00</option>
                    <option>17:30</option><option>18:30</option><option>19:30</option><option>20:30</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="form-group">
                  <label>Seating Preference</label>
                  <select name="seating_preference" value={formData.seating_preference} onChange={handleChange}>
                    <option>Indoor</option><option>Window seat</option><option>Outdoor</option><option>No preference</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Occasion</label>
                  <select name="occasion" value={formData.occasion} onChange={handleChange}>
                    <option>Casual dinner</option><option>Birthday</option><option>Date night</option><option>Family dinner</option><option>Business meal</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Pre-order a Dish</label>
                <select name="preorder_dish" value={formData.preorder_dish} onChange={handleChange}>
                  <option>No pre-order</option>
                  <option>Ghana Jollof</option>
                  <option>Waakye</option>
                  <option>Fufu & Light Soup</option>
                  <option>Chef's Sharing Platter</option>
                </select>
              </div>

              <div className="form-group">
                <label>Allergies / Special Requests</label>
                <textarea 
                  name="special_request" 
                  value={formData.special_request} 
                  onChange={handleChange} 
                  placeholder="Window seat, birthday candle, stroller space, large-group details..."
                  style={{ height: '100px' }}
                ></textarea>
              </div>

              <div className="flex gap-4 mt-4">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1 items-center justify-center">
                  {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                </button>
                <button 
                  type="button" 
                  onClick={() => window.open(`https://wa.me/4915775167689?text=Hello, I would like to reserve a table for ${formData.party_size} on ${formData.date} at ${formData.time}.`, '_blank')}
                  className="btn btn-outline flex-1 items-center justify-center"
                >
                  Reserve via WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
