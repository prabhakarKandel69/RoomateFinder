import React, { useEffect } from "react";
import Icon from "../components/Icon";

const ProfileCard = ({ userData }) => {
  if (!userData) {
    return <p>Loading profile...</p>;
  }

  // Map of keys to user-friendly labels
  const labels = {
    smoking_allowed: "Smoker",
    drinking_allowed: "Drinker",
    early_riser: "Early Riser",
    introvert: "Introvert",
    is_looking: "",
  };

  // Store username in localStorage when userData is available

      localStorage.setItem("username", userData.username); // Store first name in localStorage
      localStorage.setItem("image", userData.profile_pic); // Store profile picture in localStorage


  // Filter keys with true values
  const trueKeys = Object.keys(userData).filter((key) => userData[key] === true);

  // Default or dynamic profile picture
  const profilePic = userData.profile_pic
    ? `http://127.0.0.1:7999${userData.profile_pic}`
    : "https://via.placeholder.com/80";

  return (
    <div className="flex flex-col md:flex-row items-center p-4 md:p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto my-4 md:my-6">
      {/* Profile Picture */}
      <img
        src={profilePic}
        alt={`${userData.name || "User"}'s profile picture`}
        className="w-32 h-32 rounded-lg object-cover"
      />

      {/* Profile Details */}
      <div className="mt-4 md:mt-0 md:ml-4 flex-1 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Name and Age */}
          <h2 className="text-xl font-bold text-gray-800">
            {userData.first_name || "Aakash Raj Jha"} {userData.last_name}, {userData.age || 24}
          </h2>
        </div>

        {/* Location */}
        <div className="text-gray-500 text-sm mt-2 md:mt-1 flex">
          <Icon name="location" className="h-[15px] w-[15px] mt-1 mr-1" />{" "}
          {userData.address || "Jwagal, Kupondol"}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
          {trueKeys.map((key) => (
            <span
              key={key}
              className="px-3 py-1 text-xs text-gray-600 bg-primary rounded-lg m-1"
            >
              {labels[key] || key.replace(/_/g, " ")} {/* Fallback to readable key */}
            </span>
          ))}
        </div>

        {/* Edit Profile Button */}
        <button className="mt-4 px-4 py-2 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
