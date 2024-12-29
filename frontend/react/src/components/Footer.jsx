import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-700 py-6">
      <div className="container mx-auto px-4">
        {/* Flex container for Quick Links, Social Links, and About Company */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Quick Links */}
          <div className="mb-6 md:mb-0 md:w-1/3">
            <h4 className="font-semibold text-lg mb-2">Quick Link</h4>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ / Help</Link></li>
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:w-1/3">
            <h4 className="font-semibold text-lg mb-2">Connect With Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733561.png"
                  alt="LinkedIn"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>

          {/* About Company */}
          <div className="my-6 md:my-0 md:w-1/3">
            <h4 className="font-semibold text-lg mb-2">About Company</h4>
            <p className="text-gray-600 line-clamp-2">
              Hummie simplifies your search for the perfect roommate. Connect, match, and live better—quickly and securely.
            </p>
            <div className="mt-4">
              <a
                href="/about-us"
                className="text-blue-600 hover:underline font-medium"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-sm text-gray-500">
          © 2024 Hummie. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
