import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthOverlay from '../pages/AuthOverlay';
import SearchingPage from '../pages/SearchingPage';
import Profile from '../pages/Profile';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthOverlay />} />
        <Route path="/searchingpage" element={<SearchingPage />} />
        <Route path="/profile/:username" element={<Profile />} />  {/* Make sure the path uses :username */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
