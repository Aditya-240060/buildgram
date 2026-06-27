// src/components/PostComments.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Comment } from '../types';
import { currentUser } from '../mockData';

interface PostCommentsProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

function PostComments({ comments, onAddComment }: PostCommentsProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Compose a complete structural object matching your Comment interface definitions
    const newComment: Comment = {
      id: Date.now().toString(),
      user: currentUser,
      text: inputText.trim(),
      timestamp: 'Just now'
    };

    onAddComment(newComment);
    setInputText('');
  };

  return (
    <div className="post-comments" style={{ marginTop: '8px' }}>
      <div className="comments-list" style={{ maxHeight: '100px', overflowY: 'auto', marginBottom: '8px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ fontSize: '13px', marginBottom: '4px', lineHeight: '1.4' }}>
            <Link to={`/profile/${comment.user.username}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#262626', marginRight: '6px' }}>
              {comment.user.username}
            </Link>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', borderTop: '1px solid #efefef', paddingTop: '8px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a comment..."
          style={{ flexGrow: 1, border: 'none', outline: 'none', padding: '4px', fontSize: '13px' }}
        />
        <button 
          type="submit" 
          disabled={!inputText.trim()} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#0095f6', 
            fontWeight: 'bold', 
            cursor: 'pointer', 
            opacity: inputText.trim() ? 1 : 0.4,
            fontSize: '13px'
          }}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default PostComments;