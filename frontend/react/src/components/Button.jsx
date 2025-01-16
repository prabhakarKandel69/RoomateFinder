import React from 'react';

const Button = ({ 
  label = 'Button', 
  onClick, 
  className = '', 
  type = 'button', 
  icon = null, 
  isActive = false 
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center font-semibold  rounded-full transition duration-300 
        ${isActive ? 'bg-secondary text-white' : 'bg-primary text-gray-800 hover:bg-blue-200'} 
        ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
