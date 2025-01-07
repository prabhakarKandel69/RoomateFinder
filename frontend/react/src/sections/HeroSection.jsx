import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleInputFocus = () => {
    navigate("/searchingpage"); // Redirect to the search page on input focus
  };

  return (
    <section
      className="relative bg-cover bg-center h-[800px] flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url(../img/hero.jpg)`,
      }}
    >
      {/* Black overlay with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Roommate Effortlessly!
        </h1>
        <p className="max-w-xl mx-auto mb-6">
          Connecting like-minded individuals to share spaces and create meaningful experiences. Your perfect roommate is just a click away.
        </p>
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for your ideal roommate"
            className="px-4 py-2 w-full text-black focus:outline-none bg-primary"
            onFocus={handleInputFocus} // Navigate to search page when input is focused
          />
          <button
            className="bg-[#243B55] px-6 py-2 text-white"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
