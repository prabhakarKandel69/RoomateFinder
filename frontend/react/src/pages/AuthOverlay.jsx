import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import FormComponent from '../components/FormComponent';
import Notification from '../components/Notification';

const AuthOverlay = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [formKey, setFormKey] = useState(Date.now()); // Key to reset form
  const navigate = useNavigate();  // Initialize the navigate function

  const apiUrl = 'http://127.0.0.1:8000';

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setNotification({ message: '', type: '' }); // Clear any notifications
    setFormKey(Date.now()); // Reset form
  };

  const handleLoginSubmit = async (data) => {

    try {
      setLoading(true);

      const response = await axios.post(`${apiUrl}/api/login/`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNotification({ message: 'Login successful', type: 'success' });
      localStorage.setItem('accessToken', response.data.access); // Store access token
      localStorage.setItem('refreshToken', response.data.refresh); // Store refresh token
      navigate('/dashboard');

      setFormKey(Date.now()); // Reset form after success
    } catch (error) {
      const errorMsg = error.response?.data
        ? Object.values(error.response.data).flat().join(' ')
        : 'Login failed. Please try again.';
      setNotification({ message: errorMsg, type: 'error' });
      setLoading(false);

    }
  };

  const handleRegisterSubmit = async (data) => {
    
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/api/register/`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNotification({ message: 'Registration successful! Please log in.', type: 'success' });
      setIsLogin(true);
      setFormKey(Date.now()); // Reset form after success
      setLoading(false);
    } catch (error) {
      const errorMsg = error.response?.data
        ? Object.values(error.response.data).flat().join(' ')
        : 'Registration failed. Please try again.';
        setLoading(false);
      setNotification({ message: errorMsg, type: 'error' });
    }
  };

  const loginFields = [
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true },
  ];

  const registrationFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email', required: true, validation: { requiresSpecial:true } },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password', required: true , validation: { minLength: 8, requiresNumeric: true, requiresSpecial: true } },
    { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username', required: true , validation: { minLength: 4, maxLength: 20 } },
    { name: 'first_name', label: 'First Name', type: 'text', placeholder: 'Enter your first name', required: true, validation: { pattern: /^[a-zA-Z\s]*$/ } ,type:"text"},
    { name: 'last_name', label: 'Last Name', type: 'text', placeholder: 'Enter your last name', required: true , validation: { pattern: /^[a-zA-Z\s]*$/ },type:"text" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <FormComponent
          key={formKey}
          fields={isLogin ? loginFields : registrationFields}
          onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}
          buttonText={ loading ? 'Loading...' : isLogin ? 'Login' : 'Register'
      }
        />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button type="button" onClick={handleToggle} className="text-blue-600 font-medium hover:underline ml-1">
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;
