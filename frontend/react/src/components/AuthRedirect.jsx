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
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(
        'http://127.0.0.1:7999/api/token/refresh/', // Refresh token endpoint
        { refresh: refreshToken } // Ensure the key matches your backend implementation
      );

      const { access } = response.data;
      localStorage.setItem('accessToken', access); // Store the new access token
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
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        // Attempt to refresh the token if no access token is found
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          setLoading(false);
          navigate('/home'); // Redirect to login if refresh fails
          return;
        }
      }

      // Validate the token or use it directly
      try {
        await axios.get('http://127.0.0.1:7999/api/profile/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        setLoading(false); // Token is valid
      } catch (err) {
        console.error('Error validating token:', err);
        const newAccessToken = await refreshAccessToken();
        if (!newAccessToken) {
          setLoading(false);
          navigate('/home'); // Redirect to login if refresh fails
        } else {
          setLoading(false); // Token refreshed successfully
        }
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <div>
      { children}
    </div>
  );
};

export default AuthRedirect;
