import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthRedirect = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to get a new access token using the refresh token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await axios.post(
        'http://127.0.0.1:7999/api/token/refresh/',
        { refresh: refreshToken }
      );

      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      return access;
    } catch (err) {
      console.error('Error refreshing token:', err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      let accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        // Attempt to refresh the token if no access token is found
        accessToken = await refreshAccessToken();
        if (!accessToken) {
          navigate('/home');
          return;
        }
      }

      // Validate the token or use it directly
      try {
        await axios.get('http://127.0.0.1:7999/api/profile/', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        navigate('/dashboard'); // Token is valid, navigate to dashboard
      } catch (err) {
        console.error('Error validating token:', err);
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          navigate('/home'); // Redirect to home if refresh fails
        } else {
          navigate('/dashboard'); // Successfully refreshed, navigate to dashboard
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  return <>{children}</>;
};

export default AuthRedirect;
