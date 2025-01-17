import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthOverlay from '../pages/AuthOverlay';
import SearchingPage from '../pages/SearchingPage';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Messages from '../pages/Messages';
const AppRouter = () => {
  return (
 
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/auth" element={<AuthOverlay />} />
        <Route path="/searchingpage" element={<SearchingPage />} />
        <Route path="/profile/:username" element={<Profile />} />  {/* Make sure the path uses :username */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/messages' element={<Messages />} />
      </Routes>
    </Router>
 
  );
};

export default AppRouter;
