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
        navigate('/home'); // Redirect to login if no refresh token is available
        return;
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/refresh/', // Refresh token endpoint
        { refresh_token: refreshToken }
      );

      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token); // Store new access token
      return access_token;
    } catch (err) {
      console.error("Error refreshing token", err);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/home'); // Redirect to login if refresh token is invalid
      return null;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setLoading(false);
      navigate('/home'); // Redirect to login if no access token
    } else {
      setLoading(false);
      navigate('/dashboard'); // Redirect to dashboard if access token is available
    }
  }, [navigate]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading  && children} {/* Render the page's children */}
    </div>
  );
};

export default AuthRedirect;
