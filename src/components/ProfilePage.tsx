// src/components/ProfilePage.tsx
import { useParams, Link } from 'react-router-dom';
import { mockPosts, currentUser } from '../mockData';

function ProfilePage() {
  // Read the dynamic URL parameter (:username) configured in App.tsx
  const { username } = useParams<{ username: string }>();

  // Filter the central database to grab only posts uploaded by this user
  const userPosts = mockPosts.filter((post) => post.user.username === username);

  // Derive profile details (bio, avatar) from their first post, or check if it's the current user
  const targetUser = userPosts.length > 0 
    ? userPosts[0].user 
    : (username === currentUser.username ? currentUser : null);

  // Error boundary fallback if the URL string doesn't exist in our mock data
  if (!targetUser) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px', fontFamily: 'sans-serif' }}>
        <h3>User "{username}" not found</h3>
        <Link to="/" style={{ color: '#0095f6', textDecoration: 'none' }}>Back to Feed</Link>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      {/* Profile Header Profile Section */}
      <div className="profile-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px', 
        marginBottom: '40px', 
        borderBottom: '1px solid #dbdbdb', 
        paddingBottom: '30px' 
      }}>
        <img 
          src={targetUser.avatarUrl} 
          alt={targetUser.username} 
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }} 
        />
        <div>
          <h2 style={{ margin: '0 0 10px 0', fontWeight: '300', fontSize: '28px' }}>{targetUser.username}</h2>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', fontSize: '15px' }}>
            <span><strong>{targetUser.postCount ?? userPosts.length}</strong> posts</span>
            <span><strong>{targetUser.followerCount ?? 0}</strong> followers</span>
          </div>
          
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>
            {targetUser.bio || 'No bio provided yet.'}
          </p>
        </div>
      </div>

      {/* Navigation Link Back to Timeline */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0095f6', fontWeight: 'bold', fontSize: '14px' }}>
          ← Back to Feed
        </Link>
      </div>

      {/* Grid Layout Layout for User Posts */}
      <div className="profile-posts-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '15px' 
      }}>
        {userPosts.map((post) => (
          <div key={post.id} style={{ aspectRatio: '1/1', overflow: 'hidden', backgroundColor: '#efefef', borderRadius: '4px' }}>
            <img 
              src={post.imageUrl} 
              alt="grid content" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </div>
        ))}
      </div>
      
      {/* Empty State Fallback */}
      {userPosts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#8e8e8e', marginTop: '60px', fontSize: '14px' }}>
          No posts available.
        </p>
      )}
    </div>
  );
}

export default ProfilePage;