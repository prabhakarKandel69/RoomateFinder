import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import MatchesSection from '../sections/MatchesSection';
import FeaturesSection from '../sections/FeaturesSection';
import AuthOverlay from './AuthOverlay';
import LocationComponent from '../components/LocationComponent';


const LandingPage = () => {
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  const handleSignInClick = () => {
    setIsAuthVisible(true); // Show the AuthOverlay
  };

  const handleCloseAuth = () => {
    setIsAuthVisible(false); // Hide the AuthOverlay
  };

  return (
    <>
    {/* <LocationComponent/> */}
      <Navbar onSignInClick={handleSignInClick} /> {/* Pass the handler */}
      {isAuthVisible && <AuthOverlay onClose={handleCloseAuth} />} {/* Conditionally render */}
      <HeroSection />
      <MatchesSection />
      <FeaturesSection onSignInClick={handleSignInClick} />
      <Footer />
    </>
  );
};

export default LandingPage;
