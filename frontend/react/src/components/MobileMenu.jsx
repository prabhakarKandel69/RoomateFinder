import React from 'react';
import NavLinks from './NavLinks';
import Button from './Button';
import Logo from './logo';




const MobileMenu = ({ isOpen, setIsOpen ,onSignInClick}) => {
    const links = [
        { href: '/', label: 'Home', icon: 'home' },
        { href: '/about', label: 'About Us', icon: 'about' },
        { href: '/contact', label: 'Contact Us', icon: 'contact' },
      ];
      
      
  return (
    <div
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
        <div className="flex justify-between items-center p-4">
         <Logo />
         </div>

      {/* Navigation Links */}
      <div className="flex justify-between items-center p-4 mt-6">
      <NavLinks links={links} isMobile={true} />
      </div>

      {/* Button */}
      <div className="mt-6 px-4">
        <Button
          label="Sign In"
          className="hover:bg-blue-700 transition-all duration-200 bg-secondary text-white px-5 py-3"
          onClick={onSignInClick} // Add onClick for navigation
        />
      </div>
    </div>
  );
};

export default MobileMenu;
