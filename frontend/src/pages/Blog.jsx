import React, { useState, useEffect } from 'react';
import api from '../api';

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({});

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

    const handleCommentChange = (postId, field, value) => {
        setCommentData(prev => ({
            ...prev,
            [postId]: { ...prev[postId], [field]: value }
        }));
    };

    const submitComment = (e, postId) => {
        e.preventDefault();
        const data = commentData[postId];
        if (!data || !data.author || !data.text) return;

        api.post('comments/', { post: postId, author: data.author, text: data.text })
            .then(() => {
                // Clear form for this post
                setCommentData(prev => ({ ...prev, [postId]: { author: '', text: '' } }));
                // Refresh posts to get new comments
                fetchPosts();
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div style={{ padding: '100px 5%', textAlign: 'center' }}>Loading stories...</div>;

    return (
        <div className="page active" style={{ display: 'block' }}>
            <div className="section-tag">Our Blog</div>
            <h1 className="section-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900 }}>Stories from the Kitchen</h1>
            <p style={{ color: '#888', fontSize: '16px', marginBottom: 0 }}>Recipes, culture, food guides, and everything West African food in Hamburg.</p>

            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px', marginTop: '60px' }}>
                {blogPosts.map((post) => (
                    <div className="blog-card" key={post.id} style={{ border: '1px solid #e8e8e8', borderRadius: '20px', overflow: 'hidden' }}>
                        <div className="blog-img" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '220px' }}></div>
                        <div className="blog-body" style={{ padding: '24px' }}>
                            <div className="blog-tag" style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '10px' }}>{post.tag}</div>
                            <div className="blog-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>{post.title}</div>
                            <div className="blog-excerpt" style={{ fontSize: '14px', color: '#888', lineHeight: 1.6 }}>{post.excerpt}</div>
                            <div className="blog-date" style={{ fontSize: '12px', color: '#bbb', marginTop: '16px', borderBottom: '1px solid #eee', paddingBottom: '16px', marginBottom: '16px' }}>{post.date}</div>
                            
                            {/* Comments Section */}
                            <div className="comments-section">
                                <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Comments ({post.comments?.length || 0})</h4>
                                <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '16px', pr: 2 }}>
                                    {post.comments?.map(comment => (
                                        <div key={comment.id} style={{ background: '#f9f9f9', padding: '10px 12px', borderRadius: '8px', marginBottom: '8px' }}>
                                            <div style={{ fontSize: '12px', fontWeight: 700, color: '#333' }}>{comment.author}</div>
                                            <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>{comment.text}</div>
                                        </div>
                                    ))}
                                </div>
                                
                                <form onSubmit={(e) => submitComment(e, post.id)} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Your name" 
                                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px' }}
                                        value={commentData[post.id]?.author || ''}
                                        onChange={(e) => handleCommentChange(post.id, 'author', e.target.value)}
                                        required
                                    />
                                    <textarea 
                                        placeholder="Add a comment..." 
                                        style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', resize: 'vertical', minHeight: '60px' }}
                                        value={commentData[post.id]?.text || ''}
                                        onChange={(e) => handleCommentChange(post.id, 'text', e.target.value)}
                                        required
                                    />
                                    <button type="submit" style={{ background: 'var(--black)', color: 'white', padding: '8px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', border: 'none' }}>
                                        Post Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
