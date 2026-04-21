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
        <div id="blog-detail" className="page active" style={{ padding: '0' }}>
            <div className="blog-detail-container">
                <Link to="/blog" className="blog-detail-back">
                    &larr; Back to Blog
                </Link>

                <div className="blog-detail-tag">{post.tag}</div>
                <h1 className="blog-detail-title">{post.title}</h1>
                <div className="blog-detail-date">{post.date}</div>

                {post.image && (
                    <div className="blog-detail-img" style={{ backgroundImage: `url(${post.image})` }}></div>
                )}

                <div className="blog-detail-content">
                    {post.content}
                </div>

                {/* Comments Section */}
                <div className="comments-section">
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 800, marginBottom: '24px', color: 'var(--black)' }}>
                        Comments ({post.comments?.length || 0})
                    </h3>
                    
                    <div style={{ marginBottom: '30px' }}>
                        {post.comments?.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-author">{comment.author}</div>
                                <div className="comment-text">{comment.text}</div>
                            </div>
                        ))}
                    </div>
                    
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--black)' }}>Leave a comment</h4>
                    <form onSubmit={submitComment} className="comment-form">
                        <input 
                            type="text" 
                            placeholder="Your name" 
                            className="comment-input"
                            value={commentData.author}
                            onChange={(e) => handleCommentChange('author', e.target.value)}
                            required
                        />
                        <textarea 
                            placeholder="Write your thoughts..." 
                            className="comment-textarea"
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            value={commentData.text}
                            onChange={(e) => handleCommentChange('text', e.target.value)}
                            required
                        />
                        <button type="submit" className="comment-submit">
                            Post Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
