import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';

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
    <div className="bg-primary ">
     <Dnavbar/>
      <div className="h-screen w-1/5 bg-white flex flex-col justify-between p-4 m-5 rounded-lg shadow-lg">
      <Dsnavbar active="Messages" />  
    </div>
    </div>
    </>
  );
};

export default Dashboard;
