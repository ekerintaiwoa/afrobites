import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentData, setCommentData] = useState({ author: '', text: '' });

    const fetchPost = () => {
        api.get(`blog-posts/${id}/`)
            .then(res => {
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    const handleCommentChange = (field, value) => {
        setCommentData(prev => ({ ...prev, [field]: value }));
    };

    const submitComment = (e) => {
        e.preventDefault();
        if (!commentData.author || !commentData.text) return;

        api.post('comments/', { post: id, author: commentData.author, text: commentData.text })
            .then(() => {
                // Clear form
                setCommentData({ author: '', text: '' });
                // Refresh post to get new comments
                fetchPost();
            })
            .catch(err => console.error(err));
    };

    if (loading) return <div style={{ padding: '100px 5%', textAlign: 'center' }}>Loading story...</div>;
    if (!post) return <div style={{ padding: '100px 5%', textAlign: 'center' }}>Story not found</div>;

    return (
        <div className="page active" style={{ display: 'block', padding: '60px 5%', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/blog" style={{ color: 'var(--orange)', textDecoration: 'none', fontWeight: 600, display: 'inline-block', marginBottom: '20px' }}>
                &larr; Back to Blog
            </Link>

            <div className="blog-tag" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--orange)', marginBottom: '10px' }}>{post.tag}</div>
            <h1 className="blog-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, marginBottom: '20px', lineHeight: 1.2 }}>{post.title}</h1>
            <div className="blog-date" style={{ fontSize: '14px', color: '#888', marginBottom: '30px' }}>{post.date}</div>

            {post.image && (
                <div className="blog-img" style={{ backgroundImage: `url(${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', borderRadius: '20px', marginBottom: '40px' }}></div>
            )}

            <div className="blog-content" style={{ fontSize: '16px', color: '#444', lineHeight: 1.8, marginBottom: '60px' }}>
                {post.content}
            </div>

            {/* Comments Section */}
            <div className="comments-section" style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px' }}>Comments ({post.comments?.length || 0})</h3>
                
                <div style={{ marginBottom: '30px' }}>
                    {post.comments?.map(comment => (
                        <div key={comment.id} style={{ background: '#f9f9f9', padding: '16px', borderRadius: '12px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#333' }}>{comment.author}</div>
                            <div style={{ fontSize: '15px', color: '#555', marginTop: '8px' }}>{comment.text}</div>
                        </div>
                    ))}
                </div>
                
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Leave a comment</h4>
                <form onSubmit={submitComment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input 
                        type="text" 
                        placeholder="Your name" 
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}
                        value={commentData.author}
                        onChange={(e) => handleCommentChange('author', e.target.value)}
                        required
                    />
                    <textarea 
                        placeholder="Write your thoughts..." 
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', resize: 'vertical', minHeight: '100px' }}
                        value={commentData.text}
                        onChange={(e) => handleCommentChange('text', e.target.value)}
                        required
                    />
                    <button type="submit" style={{ background: 'var(--black)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', border: 'none', alignSelf: 'flex-start' }}>
                        Post Comment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogDetail;
