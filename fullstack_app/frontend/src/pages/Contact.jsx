import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="contact-page pt-32 pb-24 min-h-screen bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <span className="kicker">Get in Touch</span>
          <h1 className="section-title">We're in Hamburg,<br />Ready to Serve You</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          <div>
            <div className="flex flex-col gap-10">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-orange-light text-orange rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Our Location</h4>
                  <p className="text-gray-500">Hamburg, Germany</p>
                  <p className="text-orange text-sm font-bold mt-2 cursor-pointer hover:underline">Get directions on Google Maps</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-orange-light text-orange rounded-2xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Phone Number</h4>
                  <p className="text-gray-500"><a href="tel:+4915775167689" className="hover:text-black transition-all">+49 157 7516 7689</a></p>
                  <p className="text-gray-400 text-sm mt-1">Available for calls and SMS</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-orange-light text-orange rounded-2xl flex items-center justify-center shrink-0">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">WhatsApp Bookings</h4>
                  <p className="text-gray-500"><a href="https://wa.me/4915775167689" target="_blank" rel="noopener" className="hover:text-black transition-all">+49 157 7516 7689</a></p>
                  <p className="text-gray-400 text-sm mt-1">Fastest way to get a quick response</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-orange-light text-orange rounded-2xl flex items-center justify-center shrink-0">
                   <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Opening Hours</h4>
                  <p className="text-gray-500">Mon – Sun · 12:00 – 22:00</p>
                  <p className="text-gray-400 text-sm mt-1">Kitchen closes at 21:30</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-gray-100">
              <h5 className="font-bold text-sm uppercase tracking-widest mb-6">Socials</h5>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-orange hover:text-white transition-all">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-orange hover:text-white transition-all">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
             <div className="absolute inset-0 bg-orange opacity-10 pointer-events-none"></div>
             <img 
               src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1974" 
               alt="Restaurant Interior" 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-10 left-10 p-8 glass rounded-2xl max-w-xs shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-orange mb-2">
                    <MapPin size={16} /> <span className="text-xs font-black uppercase tracking-widest">Hamburg</span>
                </div>
                <h4 className="text-xl font-bold mb-2 text-black">Find us in the heart of the city.</h4>
                <p className="text-gray-600 text-sm">Our doors are open for everyone seeking bold, soulful flavours.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
