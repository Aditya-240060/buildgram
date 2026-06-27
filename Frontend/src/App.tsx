// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#fafafa', minHeight: '100vh', margin: 0 }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;