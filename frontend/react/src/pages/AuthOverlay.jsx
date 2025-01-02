import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormComponent from '../components/FormComponent'; // Reusable Form Component
import Notification from '../components/Notification'; // Reusable Form Component



const AuthOverlay = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const[isbuttonclicked, setIsButtonClicked] = useState(false);


  // Example: Prefill form if data exists
  // useEffect(() => {
  //   const checkUserStatus = async () => {
  //     try {
  //       const user = localStorage.getItem('user');
  //       if (user) {
  //         alert('You are already logged in.');
  //       }
  //     } catch (error) {
  //       console.error('Error checking user status:', error);
  //     }
  //   };
  //   checkUserStatus();
  // }, []); // Runs once when the component mounts

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage(''); // Clear any error messages
  };

  const handleLoginSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      let errorMsg = 'Login failed. Please try again.';
      if (error.response?.data) {
        // Extract error message from the backend response
        const errors = error.response.data;
        errorMsg = Object.values(errors).flat().join(' ') || errorMsg;
      } 
      setIsButtonClicked(true);
      setNotification({ message: errorMsg, type: 'error' });
  
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleRegisterSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNotification({ message: 'Registration successful! Please log in.', type: 'success'});
      
      setIsLogin(true);
    } catch (error) {
      let errorMsg = 'Registration failed. Please try again.';
      if (error.response?.data) {
        // Extract error message from the backend response
        const errors = error.response.data;
        errorMsg = Object.values(errors).flat().join(' ') || errorMsg;
      } 
      setIsButtonClicked(true);     
      setNotification({ message: errorMsg, type: 'error' });
      
    } finally {
      setIsLoading(false);
    }
  };

  const loginFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true , validation: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }},
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true, validation: { minLength: 8 } },
  ];

  const registrationFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true, validation: {pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, } },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true , validation: { minLength: 8,requiresNumeric: true, requiresSpecial: true,  }},
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true , validation: { type: "text" }},
    { name: 'first_name', label: 'First Name', type: 'text', placeholder: 'Enter your first name', required: true , validation: { type: "text" }},
    { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Enter your last name', required: true, validation: { type: "text" } },
  ];

  return (
    <>
{isbuttonclicked &&
    notification && (
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification(null)}
      />
    )}

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
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Form Title */}
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-700">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {/* Form */}
        <FormComponent
          fields={isLogin ? loginFields : registrationFields}
          onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
          buttonText={isLogin ? 'Login' : 'Register'}
        />

        {/* Toggle Between Login and Register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLogin ? 'Don’t have an account yet?' : 'Already have an account?'}
            <button
              type="button"
              onClick={handleToggle}
              className="text-blue-600 font-medium hover:underline ml-1 dark:text-[#243B55]"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthOverlay;
