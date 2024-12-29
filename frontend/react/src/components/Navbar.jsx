import React, { useState } from 'react';
import Logo from './logo';
import NavLinks from './NavLinks';
import Button from './Button';
import MobileMenu from './MobileMenu'; // Import MobileMenu for side navigation


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact Us' },
  ];

  return (
    <nav className="bg-white shadow-md px-6 py-2">
      <div className="flex justify-around items-center container mx-auto">
        {/* Logo */}
        <Logo />

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden transform hover:scale-110 transition-transform duration-300">
          <button
            onClick={() => setIsOpen(!isOpen)}
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
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex items-center space-x-6">
        <NavLinks links={links} isMobile={false} />
        </div>

        {/* Desktop Nav Links and Button */}
        <div className="hidden lg:flex items-center space-x-6">
          <Button label="Sign In" className="hover:bg-green-700" />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
};

export default Navbar;
