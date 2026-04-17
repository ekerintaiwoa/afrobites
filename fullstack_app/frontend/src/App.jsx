import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ReservationModal from './components/ReservationModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = (e) => {
    if (e) e.preventDefault();
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Navbar onOpenBooking={openBooking} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home onOpenBooking={openBooking} />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
        
        <ReservationModal isOpen={isBookingOpen} onClose={closeBooking} />
      </div>
    </Router>
  );
}

export default App;
