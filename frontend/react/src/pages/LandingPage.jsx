import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../sections/HeroSection';
import MatchesSection from '../sections/MatchesSection';
import FeaturesSection from '../sections/FeaturesSection';


const LandingPage = () => {
  return (
    <>
    <Navbar />
    
    <HeroSection/>
    <MatchesSection/>
    <FeaturesSection/>
    

    <Footer />
   
    </>
  );
};

export default LandingPage;
