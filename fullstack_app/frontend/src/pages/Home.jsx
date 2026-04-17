import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Calendar, ArrowRight, Star, Clock, Globe, Heart, Users } from 'lucide-react';

const Home = ({ onOpenBooking }) => {
  const [reviews, setReviews] = useState([]);
  const [featuredDishes, setFeaturedDishes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [revRes, menuRes] = await Promise.all([
          axios.get('reviews/'),
          axios.get('menu-items/?is_featured=True')
        ]);
        setReviews(revRes.data);
        setFeaturedDishes(menuRes.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2070") center/cover' }}>
        <div className="container text-center relative z-10" style={{ maxWidth: '800px' }}>
          <span className="kicker animate-slide-up" style={{ color: 'var(--orange)' }}>African Dining in Hamburg</span>
          <h1 className="section-title text-white animate-slide-up" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', animationDelay: '0.1s' }}>
            Bold Flavours,<br />Traditional <span className="text-orange">Soul</span>.
          </h1>
          <p className="text-white mb-8 animate-slide-up" style={{ fontSize: '18px', opacity: 0.9, animationDelay: '0.2s', maxWidth: '600px', margin: '0 auto 40px' }}>
            King’s Afro Bites brings a modern dining experience built around Ghanaian classics. Reserve your table and discover the real taste of West Africa.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={onOpenBooking} className="btn btn-primary">
              <Calendar size={20} /> Book a Table
            </button>
            <button className="btn btn-outline text-white" onClick={() => window.location.href='/menu'}>
              View Menu <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        {/* Reservation Quick Form (Desktop Only) */}
        {!onOpenBooking && (
        <div className="md-flex absolute bottom-[-40px] left-1/2 transform translate-x-1/2 glass p-8 rounded-2xl shadow-2xl z-20" style={{ width: '1000px', transform: 'translateX(-50%)', backgroundColor: '#fff' }}>
            {/* Simple placeholder for quick UI */}
        </div>
        )}
      </section>

      {/* Featured Dishes */}
      <section className="section" style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <span className="kicker">Signature Menu</span>
              <h2 className="section-title">Dishes that turn first-timers into regulars</h2>
            </div>
            <p className="text-gray-500 max-w-sm">Every recipe is rooted in authentic Ghanaian tradition — no shortcuts, no compromises.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:translate-y-[-8px]">
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={dish.image || `https://source.unsplash.com/800x600/?african,food,${dish.name}`} 
                    alt={dish.name} 
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{dish.name}</h3>
                    <span className="text-orange font-bold">€{dish.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6">{dish.description}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#fff5df', color: '#704800' }}>Authentic</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: '#fff5df', color: '#704800' }}>Chef's Pick</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="section" style={{ backgroundColor: 'var(--orange)', padding: '40px 0' }}>
        <div className="container flex justify-between flex-wrap gap-8 text-black">
          {[
            { label: 'Happy Customers', val: '500+', icon: <Users size={24} /> },
            { label: 'Authentic Dishes', val: '24+', icon: <Clock size={24} /> },
            { label: 'Avg. Wait Time', val: '15 min', icon: <Heart size={24} /> },
            { label: 'Trust Rating', val: '4.9★', icon: <Star size={24} /> }
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="p-3 bg-black text-orange rounded-xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-black">{stat.val}</div>
                <div className="text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story / Private Dining */}
      <section className="section py-24">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div className="p-12 rounded-3xl text-white" style={{ backgroundColor: 'var(--black)' }}>
              <span className="kicker">Our Story</span>
              <h2 className="text-4xl mb-6">A startup site that sells the experience, not just the meal</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                King’s Afro Bites was born out of a mission: to bring the bold flavors of West Africa to Hamburg. This version shifts the focus to dine-in reservations, inviting you to discover culture through food.
              </p>
              <button className="flex items-center gap-2 text-orange font-bold hover:gap-4 transition-all">
                Learn more about our roots <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="p-12 rounded-3xl" style={{ backgroundColor: 'var(--soft)' }}>
              <span className="kicker">Private Dining</span>
              <h2 className="text-4xl mb-6">For birthdays, teams, and community nights</h2>
              <p className="text-gray-600 mb-8">
                Large-party messaging helps us win group bookings and repeat events. Whether it's a family reunion or a business lunch, we've got you covered.
              </p>
              <ul className="flex flex-col gap-4">
                {['Up to 24 guests for family-style dining', 'Birthday setup request in booking flow', 'Corporate enquiry block', 'Pre-selected signature platter'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold text-gray-800">
                    <div className="w-2 h-2 rounded-full bg-orange"></div> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section" style={{ backgroundColor: '#fff' }}>
        <div className="container text-center">
            <span className="kicker">What Guests Say</span>
            <h2 className="section-title mb-16">Stories from our tables</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {reviews.map((rev) => (
                    <div key={rev.id} className="p-8 bg-white rounded-2xl text-left border border-gray-100 shadow-sm">
                        <div className="flex gap-1 text-orange mb-6">
                            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-gray-900 text-lg italic mb-8" style={{ lineHeight: '1.8' }}>"{rev.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange flex items-center justify-center font-bold text-white">{rev.avatar_letter}</div>
                            <div>
                                <h4 className="font-bold">{rev.name}</h4>
                                <p className="text-gray-500 text-sm">{rev.location}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
