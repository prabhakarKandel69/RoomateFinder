import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Card = ({ username, address, profile_pic, min_budget, max_budget }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full sm:w-auto">
      {/* Profile Picture */}
      <img
        src={`http://127.0.0.1:7999${profile_pic}`}
        alt={username || "User"}
        className="w-80 h-48 sm:h-64 object-cover"
      />
      
      {/* Profile Details */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{username}</h3>
        <p className="text-gray-600 text-sm mt-1">
          <strong>Address:</strong> {address || "N/A"}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          <strong>Budget:</strong> Rs {min_budget} - Rs {max_budget}
        </p>
        <Button 
          className="mt-4 bg-secondary text-white px-4 py-2 rounded-lg w-full"
          label="View Profile"
          onClick={() => navigate(`/profile/${username}/Matches`)}
        />
      </div>
    </div>
  );
};

export default Card;
