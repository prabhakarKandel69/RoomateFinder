import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import ProfileCard from '../sections/ProfileCard';
import Suggestions from '../sections/Suggestions';
import AuthRedirect from '../components/AuthRedirect';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navigate('/'); // Redirect to login if no access token
    } else {
      // Fetch the profile data from the backend
      const fetchProfile = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);  // Assuming response contains profile data
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch user data');
          setLoading(false);
        }
      };
      
      fetchProfile();
    }
  }, [navigate]);

  return (
    <>
    <AuthRedirect>
      <div className="bg-primary">
        <Dnavbar />
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar */}
          <div className="w-full min-h-screen md:w-1/5 bg-white flex flex-col justify-between p-4 m-8 rounded-lg shadow-lg">
            <Dsnavbar active="Dashboard" />
          </div>

          {/* Profile Card Content */}
          <div className="flex-1 m-3">
            {loading && <p>Loading...</p>} {/* Show loading state */}
            {error && <p className="text-red-500">{error}</p>} {/* Show error message */}
            {userData && !loading && !error && <ProfileCard userData={userData} />} {/* Render ProfileCard only when data is available */}
          </div>

          <div className="m-8">
            <Suggestions />
          </div>
        </div>
      </div>
      </AuthRedirect>
    </>
  );
};

export default Dashboard;
