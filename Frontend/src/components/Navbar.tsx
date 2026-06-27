// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { currentUser } from '../mockData';

function Navbar() {
  return (
    <nav style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 40px', 
      borderBottom: '1px solid #dbdbdb', 
      position: 'sticky', 
      top: 0, 
      backgroundColor: '#fff', 
      zIndex: 100
    }}>
      <Link to="/" style={{ fontSize: '22px', fontWeight: 'bold', textDecoration: 'none', color: '#000' }}>
        BuildGram
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#000', fontSize: '18px' }}>🏠</Link>
        <Link to={`/profile/${currentUser.username}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#000' }}>
          <img src={currentUser.avatarUrl} alt="me" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Profile</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;