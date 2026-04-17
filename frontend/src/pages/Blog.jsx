import React from 'react';

const blogPosts = [
    { tag: 'Food Guide', title: 'Where to Get the Best Ghana Jollof in Hamburg', date: 'March 28, 2026', excerpt: 'Hamburg has a growing West African food scene — but if you want authentic, smoky Jollof that rivals anything in Accra, there\'s really only one place you need to know about.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800' },
    { tag: 'Culture', title: 'The History of Waakye: Ghana\'s Most Beloved Street Food', date: 'March 14, 2026', excerpt: 'From the streets of Nima to the kitchens of diaspora communities worldwide, Waakye has a rich cultural history that goes far deeper than rice and beans.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800' },
    { tag: 'Recipe', title: 'How to Make the Perfect Banku at Home', date: 'February 22, 2026', excerpt: 'Banku is one of Ghana\'s most iconic dishes — but getting it right takes patience, technique, and the right fermentation ratio. Here\'s our step-by-step guide.', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=800' },
    { tag: 'Community', title: 'The Rise of African Food in Germany\'s Biggest Cities', date: 'February 5, 2026', excerpt: 'African cuisine is having a moment in Germany. From Berlin to Hamburg, more Germans are discovering the depth and richness of West African cooking — and they love it.', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800' }
];

const Blog = () => {
    return (
        <div className="page active" style={{ display: 'block' }}>
            <div className="section-tag">Our Blog</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900 }}>Stories from the Kitchen</h1>
            <p style={{ color: '#888', fontSize: '16px', marginBottom: 0 }}>Recipes, culture, food guides, and everything West African food in Hamburg.</p>

            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginTop: '60px' }}>
                {blogPosts.map((post, idx) => (
                    <div className="blog-card" key={idx} style={{ border: '1px solid #e8e8e8', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer' }}>
                        <div className="blog-img" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '220px' }}></div>
                        <div className="blog-body" style={{ padding: '24px' }}>
                            <div className="blog-tag" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '10px' }}>{post.tag}</div>
                            <div className="blog-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>{post.title}</div>
                            <div className="blog-excerpt" style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{post.excerpt}</div>
                            <div className="blog-date" style={{ fontSize: '12px', color: '#bbb', marginTop: '16px' }}>{post.date}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
