import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Clock, User, Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('blog-posts/');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-page pt-32 pb-24 min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      <div className="container">
        <div className="text-center mb-16">
          <span className="kicker">Our Blog</span>
          <h1 className="section-title">Stories from the Kitchen</h1>
          <p className="text-gray-600 max-w-xl mx-auto">Recipes, culture, food guides, and everything West African food in Hamburg.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {posts.map(post => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-xl transition-all" style={{ height: '260px' }}>
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center text-8xl group-hover:scale-110 transition-all duration-700">
                    {post.image_emoji}
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white rounded-full text-xs font-bold uppercase tracking-widest text-orange shadow-lg">
                    {post.tag}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-2"><Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> 5 min read</span>
              </div>
              
              <h2 className="text-2xl font-bold mb-4 group-hover:text-orange transition-all leading-snug">
                {post.title}
              </h2>
              
              <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              
              <button className="flex items-center gap-2 font-black text-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                Read full story <ArrowRight size={16} className="text-orange" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
