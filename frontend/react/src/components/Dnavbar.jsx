import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import Dsnavbar from "./Dsnavbar";

const customStyles = {
  fontFamily: "Montserrat",
  fontSize: "32px",
  fontWeight: "600",
  textAlign: "left",
  textUnderlinePosition: "from-font",
  textDecorationSkipInk: "none",
  color: "#243B55",
};

const Dnavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Function to handle window resize and reset mobile menu state
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false); // Hide mobile menu when switching to desktop view
      }
    };
  
    // Add event listener for resize when component mounts
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src="../img/logo.png" // Replace with your logo URL
            alt="Logo"
            className="h-[50px] w-[50px] mr-2"
          />
          <span style={customStyles} className="text-xl font-bold">
            HUMMIE
          </span>
        </div>

        <div className="lg:hidden transform hover:scale-110 transition-transform duration-300">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/dashboard"
            className="flex items-center text-secondary-800 text-lg hover:underline"
          >
            <Icon name="home" className="h-[22px] mr-1" />
            <span className="text-xl font-bold text-gray-800">Home</span>
          </a>
          <Icon name="notification" className="w-[30px] h-[30px] text-gray-800" />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div  className={`fixed z-40 top-0 left-0  w-60  transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}>
              <div className=" md:w-1/3 bg-white flex flex-col justify-between p-4 m-1 rounded-lg shadow-lg">
              
            <Dsnavbar active="Dashboard"  />
            </div>
        </div>
      )}
    </nav>
  );
};

export default Dnavbar;
