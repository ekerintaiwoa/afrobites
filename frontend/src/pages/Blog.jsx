import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = () => {
        api.get('blog-posts/')
            .then(res => {
                setBlogPosts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) return <div style={{ padding: '100px 5%', textAlign: 'center' }}>Loading stories...</div>;

    return (
        <div className="page active" style={{ display: 'block' }}>
            <div className="section-tag">Our Blog</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900 }}>Stories from the Kitchen</h1>
            <p style={{ color: '#888', fontSize: '16px', marginBottom: 0 }}>Recipes, culture, food guides, and everything West African food in Hamburg.</p>

            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginTop: '60px' }}>
                {blogPosts.map((post) => (
                    <Link to={`/blog/${post.id}`} className="blog-card" key={post.id} style={{ border: '1px solid #e8e8e8', borderRadius: '20px', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.2s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
                        <div className="blog-img" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '220px' }}></div>
                        <div className="blog-body" style={{ padding: '24px' }}>
                            <div className="blog-tag" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '10px' }}>{post.tag}</div>
                            <div className="blog-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>{post.title}</div>
                            <div className="blog-excerpt" style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{post.excerpt}</div>
                            <div className="blog-date" style={{ fontSize: '12px', color: '#bbb', marginTop: '16px' }}>{post.date}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Blog;
