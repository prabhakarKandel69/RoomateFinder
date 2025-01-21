import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import AuthOverlay from './AuthOverlay';
import Footer from '../components/Footer';
import RoommateFilter from '../components/RoommateFilter';
import { handleSearch } from "../utils/Searchfunction";
import SearchBar from '../components/SearchBar';





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
    {/* <section className="bg-[#243B55] py-16 flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-blue-50 text-2xl sm:text-3xl font-bold mb-6">
        Find Your Perfect Roommate With Hummie
        </h2>
        <p className="max-w-xl text-blue-50 mx-auto mb-6">
        Connect with like minded people and find your ideal living situation  </p>

        <button onClick={handleSignInClick}
           className="bg-blue-50 text-[#243B55] px-6 py-2 rounded-full font-medium shadow hover:bg-gray-100 transition">
          Get Started Now
        </button>

      </div>
    </section> */}
     


    <RoommateFilter/>


    <Footer/>
    </div>
    
    </>


  )
}



export default SearchingPage
