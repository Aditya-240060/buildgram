// src/components/Post.tsx
// src/components/Post.tsx
import { useState } from 'react';
import PostHeader from './PostHeader';
import PostImage from './PostImage'; // <-- Ensure this import is here
import PostActions from './PostActions';
import PostComments from './PostComments';
import type { PostType, Comment } from '../types';

interface PostProps {
  post: PostType;
}

function Post({ post }: PostProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likes);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
  };

  const handleAddComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
  };

  return (
    <article className="post" style={{ 
      border: '1px solid #dbdbdb', 
      borderRadius: '8px', 
      marginBottom: '24px', 
      backgroundColor: '#fff',
      overflow: 'hidden'
    }}>
      <PostHeader user={post.user} />
      
      {/* Used the standalone subcomponent here */}
      <PostImage imageUrl={post.imageUrl} />

      <div style={{ padding: '12px' }}>
        <PostActions 
          isLiked={isLiked} 
          likeCount={likeCount} 
          isSaved={isSaved} 
          onLikeToggle={handleLikeToggle} 
          onSaveToggle={handleSaveToggle} 
        />
        
        <div style={{ margin: '8px 0', fontSize: '14px' }}>
          <strong>{post.user.username}</strong> {post.caption}
        </div>
        
        <div style={{ color: '#8e8e8e', fontSize: '12px', marginBottom: '8px' }}>{post.timestamp}</div>
        
        <PostComments comments={comments} onAddComment={handleAddComment} />
      </div>
    </article>
  );
}

export default Post;