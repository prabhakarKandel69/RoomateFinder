import React from 'react';

const Button = ({ label = 'Button', onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center bg-[#243B55] text-white font-semibold px-5 py-3 rounded-full hover:bg-blue-300 transition duration-300 ${className}`}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="mr-1">
        <g fill="none" stroke="currentColor">
          <path strokeLinejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
          <circle cx="12" cy="7" r="3" />
        </g>
      </svg>
      {label}
    </button>
  );
};

export default Button;
