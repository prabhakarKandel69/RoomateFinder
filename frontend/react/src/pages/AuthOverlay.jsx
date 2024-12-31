import React, { useState } from 'react';
import FormComponent from '../components/FormComponent'; // Reusable Form Component

const AuthOverlay = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLoginSubmit = (data) => {
    alert(`Login Data: ${JSON.stringify(data)}`);
  };

  const handleRegisterSubmit = (data) => {
    alert(`Register Data: ${JSON.stringify(data)}`);
  };

  // Dynamic fields based on login or registration
  const loginFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
  ];

  const registrationFields = [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-[#243B55]">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {/* Form Component */}
        <FormComponent
          fields={isLogin ? loginFields : registrationFields}
          onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
          buttonText={isLogin ? 'Login' : 'Register'}
        />

        {/* Toggle Between Login and Register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={handleToggle}
              className="text-[#1E40AF] font-medium hover:underline ml-1"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
