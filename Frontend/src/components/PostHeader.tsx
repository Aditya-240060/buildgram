// src/components/PostHeader.tsx
import { Link } from 'react-router-dom';
import type { User } from '../types';

interface PostHeaderProps {
  user: User;
}

function PostHeader({ user }: PostHeaderProps) {
  return (
    <div className="post-header" style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: '10px' }}>
      <img src={user.avatarUrl} alt={user.username} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
      <Link to={`/profile/${user.username}`} style={{ fontWeight: 'bold', textDecoration: 'none', color: '#262626', fontSize: '14px' }}>
        {user.username}
      </Link>
    </div>
  );
}

export default PostHeader;