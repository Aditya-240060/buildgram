// src/components/Feed.tsx
import { mockPosts } from '../mockData';
import Post from './Post';

function Feed() {
  return (
    <main className="feed" style={{ maxWidth: '600px', margin: '20px auto', padding: '0 10px' }}>
      {mockPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </main>
  );
}

export default Feed;