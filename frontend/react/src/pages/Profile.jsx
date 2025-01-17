import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { username } = useParams(); // Extracting username from URL params
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/profile/${username}/`);  // Make sure this URL is correct
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
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
    <div className="bg-primary min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white text-center rounded-xl shadow-md p-6 w-full max-w-lg">
      <img
  src={`http://127.0.0.1:8000${profileData.profile_pic}`}
  alt="Profile"
  className="w-32 h-32 rounded-full mx-auto border-4 border-secondary object-cover"
/>


        <h1 className="text-lg font-inter font-bold text-secondary mt-4">
          {profileData?.first_name} {profileData?.last_name}
        </h1>
        <p className="text-sm text-gray-600">@ {profileData?.address}</p>
      </div>

      {/* Budget Section */}
      <div className="bg-white text-secondary rounded-xl shadow-md p-6 mt-6 w-full max-w-lg">
        <h2 className="text-md font-semibold text-secondary mb-2">Budget</h2>
        <p className="text-sm">
          <span className="font-medium">Minimum:</span> Rs {profileData?.min_budget}
        </p>
        <p className="text-sm">
          <span className="font-medium">Maximum:</span> Rs {profileData?.max_budget}
        </p>
      </div>
    </div>
  );
};

export default Profile;
