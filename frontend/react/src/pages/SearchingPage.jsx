import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import AuthOverlay from './AuthOverlay';
import Footer from '../components/Footer';
import RoommateFilter from '../components/RoommateFilter';






const SearchingPage = () => {
     
    const [isAuthVisible, setIsAuthVisible] = useState(false);
    

    const handleSignInClick = () => {
        setIsAuthVisible(true); // Show the AuthOverlay
      };
    
      const handleCloseAuth = () => {
        setIsAuthVisible(false); // Hide the AuthOverlay
      };


    

     

  return (
    <>
    <div className="bg-[#E7F8FD]">
     <Navbar onSignInClick={handleSignInClick} /> {/* Pass the handler */}
      {isAuthVisible && <AuthOverlay onClose={handleCloseAuth} />} {/* Conditionally render */}
      
    <RoommateFilter/>


    <Footer/>
    </div>
    
    </>


  )
}



export default SearchingPage
