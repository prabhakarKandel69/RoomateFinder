import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthOverlay from '../pages/AuthOverlay';
import SearchingPage from '../pages/SearchingPage';



const AppRouter = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<AuthOverlay />} />
        <Route path="/searchingpage" element={<SearchingPage/>} />

        

       
      </Routes>
    </Router>
  );
};

export default AppRouter;
