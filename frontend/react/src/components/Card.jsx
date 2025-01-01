import React from "react";

const Card = ({ name, description, image }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full sm:w-auto">
      <img
        src={image}
        alt={name}
        className="w-full h-48 sm:h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <button className="mt-4 bg-[#243B55] text-white px-4 py-2 rounded w-full">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Card;
