import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Search, Info } from 'lucide-react';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('categories/');
        setCategories(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = categories.flatMap(cat => 
    (activeCategory === 'All' || activeCategory === cat.name) ? cat.items : []
  ).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="menu-page pt-32 pb-24 min-h-screen" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="kicker">Full Menu</span>
          <h1 className="section-title">Everything We Cook</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Scroll through our authentic Ghanaian menu. All dishes are made fresh to order with ingredients sourced directly from West Africa.</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md-flex justify-between items-center gap-8 mb-16 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-2 flex-wrap justify-center">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === 'All' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All Dishes
            </button>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all ${activeCategory === cat.name ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search dishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 !py-2.5 !rounded-full bg-gray-50 border-none"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all h-full flex flex-col">
              <div style={{ height: '220px', position: 'relative' }}>
                <img 
                  src={item.image || `https://source.unsplash.com/800x600/?african,food,${item.name}`} 
                  alt={item.name} 
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg font-black text-sm">
                  €{item.price}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{item.description}</p>
                
                <button className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-bold text-sm hover:bg-orange hover:text-white flex items-center justify-center gap-2">
                  <Info size={16} /> Recipe Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl font-bold">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
