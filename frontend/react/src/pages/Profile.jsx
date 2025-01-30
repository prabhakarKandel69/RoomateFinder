import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Icon from '../components/Icon';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import Button from '../components/Button';
import Notification from "../components/Notification";

const Profile = () => {
  const { username, active } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [apiUsername, setApiUsername] = useState(null); // Store API username


  // Fetch profile data and check if request was sent
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get(`api/profile/${username}/`);
        setProfileData(response.data);

        // Assuming backend returns a field like "has_sent_request"
        if (response.data.username) {
          setApiUsername(response.data.username);
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfileData();
    }
  }, [username]);

  // Send a match request
  const sendRequest = async () => {
    setIsRequestLoading(true);
    try {
      await api.post('/matches/reqmatch/', { username });
      setIsRequestSent(true);
      localStorage.setItem(`requestSent_${apiUsername}`, 'true'); // ✅ Store request status
      Notification('Request sent successfully!', 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
      Notification(errorMessage, 'error');
    } finally {
      setIsRequestLoading(false);
    }
  };

  // Accept match request
  const handleAccept = async () => {
    setIsRequestLoading(true);
    try {
      await api.post('/matches/match/', { username });
      Notification('Request accepted!', 'success');
    } catch (error) {
      console.error('Error accepting request:', error);
      Notification('Failed to accept request.', 'error');
    } finally {
      setIsRequestLoading(true);
    }
  };

  // Check localStorage to see if request was sent before
  useEffect(() => {
    if (apiUsername) {
      const storedRequestStatus = localStorage.getItem(`requestSent_${apiUsername}`);
      if (storedRequestStatus === 'true') {
        setIsRequestSent(true);
      }
    }
  }, [apiUsername]); // ✅ Trigger when API username is available
  

  if (loading) return <div className="text-center text-secondary">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-primary min-h-screen">
      <Dnavbar />
      <div className="flex flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full min-h-screen md:w-1/5 bg-white flex flex-col justify-between p-4 m-8 rounded-lg shadow-lg">
          <Dsnavbar active={active} />
        </div>

        {/* Profile Section */}
        <div className="flex-1 bg-primary py-5 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto items-center">
          {/* Profile Header */}
          <div className="relative bg-white rounded-xl shadow-md p-6 text-center">
            {/* Back Button */}
            <div className="absolute top-4 left-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-secondary hover:text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="ml-2 text-sm font-medium">Back</span>
              </button>
            </div>

            {/* Profile Picture */}
            <img
              src={`http://127.0.0.1:8000${profileData.profile_pic}`}
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto border-4 border-blue-500 object-cover"
            />

            {/* Profile Name */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-4">
              {profileData?.first_name} {profileData?.last_name}, {profileData?.age}
            </h1>

            {/* Location */}
            <div className="text-gray-500 text-sm sm:text-base mt-2 md:mt-1 flex items-center justify-center">
              <Icon name="location" className="h-[15px] w-[15px] sm:h-5 sm:w-5 mt-1 mr-1" src="../../img/location.svg" />
              {profileData.address || 'Jwagal, Kupondol'}
            </div>

            {/* Match Request Button */}
            <div className="mt-4 flex justify-center items-center">
              {active === 'Matches' ? (
                <Button
                  className={`mt-2 bg-secondary text-white py-2 px-4 rounded-lg font-medium ${isRequestLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  label={isRequestLoading ? 'Accepted' : 'Accept Request'}
                  icon={<Icon name="request" className="h-5 w-5" src="../../img/request.svg" />}
                  onClick={!isRequestLoading ? handleAccept : null}
                  disabled={isRequestLoading}
                />
              ) : (
                <Button
                  className={`mt-2 bg-secondary text-white py-2 px-4 rounded-lg font-medium ${isRequestSent || isRequestLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  label={isRequestSent ? 'Sent' : 'Send Request'}
                  icon={<Icon name="request" className="h-5 w-5" src="../../img/request.svg" />}
                  onClick={!isRequestSent && !isRequestLoading ? sendRequest : null}
                  disabled={isRequestSent || isRequestLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
