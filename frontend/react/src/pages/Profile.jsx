import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import AuthRedirect from '../components/AuthRedirect';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import Button from '../components/Button';
import Notification from "../components/Notification";

const Profile = () => {
  const { username, active } = useParams(); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestStatus, setRequestStatus] = useState(null);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  // Send a match request
  const sendRequest = async (data = {}) => {
    const apiUrl = 'http://127.0.0.1:8000/matches/reqmatch/';
    const accessToken = localStorage.getItem('accessToken');
    setIsRequestLoading(true);

    try {
      const response = await axios.post(apiUrl, 
        { username: data }, // Sending username as 0
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log('API Response:', response.data);
      setIsRequestLoading(false);
      Notification('Request sent successfully!', 'success');
    } catch (error) {
      console.error('Error calling API:', error.response || error.message);
      setIsRequestLoading(false);
      Notification('Failed to send request.', 'error');
    }
  };

  // Handle accept request
  const handleAccept = async (data) => {
    const apiUrl = `http://127.0.0.1:8000/matches/match/`; // URL for accepting a match request
    const accessToken = localStorage.getItem('accessToken');
    setIsRequestLoading(true);

    try {
      const response = await axios.post(apiUrl, 
        {username: data}, 
         {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Request accepted:', response.data);
      setIsRequestLoading(true);
      Notification('Request accepted!', 'success');
    } catch (error) {
      console.error('Error accepting request:', error.response || error.message);
      setIsRequestLoading(false);
      Notification('Failed to accept request.', 'error');
    }
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);
        setProfileData(response.data);
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

  if (loading) return <div className="text-center text-secondary">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <AuthRedirect>
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
              {/* Back Arrow */}
              <div className="absolute top-4 left-4">
                <button
                  onClick={() => window.history.back()}
                  className="flex items-center text-secondary hover:text-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
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

              {/* Request or Accept Button */}
              <div className="mt-4 flex justify-center items-center">
                {active === 'Matches' ? (
                  <Button
                    className={`mt-2 bg-secondary text-white py-2 px-4 rounded-lg font-medium ${
                      isRequestLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                    label={isRequestLoading ? 'Accepted' : 'Accept Request'}
                    icon={<Icon name="request" className="h-5 w-5" src="../../img/request.svg" />}
                    onClick={() => !isRequestLoading && handleAccept(profileData.username)}
                    disabled={isRequestLoading}
                  />
                ) : (
                  <Button
                    className={`mt-2 bg-secondary text-white py-2 px-4 rounded-lg font-medium ${
                      isRequestLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                    label={isRequestLoading ? 'Sent' : 'Send Request'}
                    icon={<Icon name="request" className="h-5 w-5" src="../../img/request.svg" />}
                    onClick={() => !isRequestLoading && sendRequest(profileData.username)}
                    disabled={isRequestLoading}
                  />
                )}
              </div>
            </div>

            {/* About Me Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-lg sm:text-xl font-semibold font-inter text-secondary-700">About Me</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-2">{profileData?.about_me}</p>
            </div>

            {/* Roommate Preference Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-lg sm:text-xl font-semibold font-inter text-secondary-700">Roommate Preference</h2>
              <table className="w-full mt-2 text-sm sm:text-base text-gray-600">
                <tbody>
                  <tr>
                    <td className="font-medium">Gender Preference</td>
                    <td className="text-right">{profileData?.gender_preference}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Age Range</td>
                    <td className="text-right">{profileData?.age_range}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Smoking</td>
                    <td className="text-right">
                      {profileData?.smoking_allowed ? 'Allowed' : 'Not Allowed'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Pets</td>
                    <td className="text-right">
                      {profileData?.pets_allowed ? 'Allowed' : 'Not Allowed'}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-medium">Lifestyle</td>
                    <td className="text-right">{profileData?.lifestyle}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Monthly Budget</td>
                    <td className="text-right">
                      Rs {profileData?.min_budget} - Rs {profileData?.max_budget}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Room Details Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-lg sm:text-xl font-semibold font-inter text-secondary-700">Room Details</h2>
              <table className="w-full mt-2 text-sm sm:text-base text-gray-600">
                <tbody>
                  <tr>
                    <td className="font-medium">Room Type</td>
                    <td className="text-right">{profileData?.room_type}</td>
                  </tr>
                  <tr>
                    <td className="font-medium">Bathroom</td>
                    <td className="text-right">{profileData?.bathroom}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
};

export default Profile;
