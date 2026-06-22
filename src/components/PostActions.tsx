// src/components/PostActions.tsx
interface PostActionsProps {
  isLiked: boolean;
  likeCount: number;
  isSaved: boolean;
  onLikeToggle: () => void;
  onSaveToggle: () => void;
}

function PostActions({ isLiked, likeCount, isSaved, onLikeToggle, onSaveToggle }: PostActionsProps) {
  return (
    <div className="post-actions">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onLikeToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: 0 }}>
            {isLiked ? '❤️' : '🤍'}
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: 0 }}>💬</button>
        </div>
        <button onClick={onSaveToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', padding: 0 }}>
          <span style={{ filter: isSaved ? 'none' : 'grayscale(100%)' }}>🔖</span>
        </button>
      </div>
      <strong style={{ fontSize: '14px' }}>{likeCount} likes</strong>
    </div>
  );
}

export default PostActions;