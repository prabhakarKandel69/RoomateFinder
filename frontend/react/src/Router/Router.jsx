import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthOverlay from '../pages/AuthOverlay';



const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<AuthOverlay />} />

       
      </Routes>
    </Router>
  );
};

export default AppRouter;
