import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomType, setRoomType] = useState("has_room");

  const handleInputChange = (e) => setSearchTerm(e.target.value);
  const handleSelectChange = (e) => setRoomType(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ searchTerm, roomType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-center bg-white p-3 mt-2 rounded-lg shadow-sm max-w-2xl mx-auto space-y-3 md:space-y-0 md:space-x-3"
    >
      {/* Input for Address */}
      <div className="relative w-full md:w-auto bg-[#E7F8FD] px-3 py-2 rounded-lg flex items-center">
        <img src="../img/location.svg" alt="location" className="h-6 w-6 mr-2" />
        <input
          type="text"
          className="bg-transparent focus:outline-none text-[#243B55] text-sm font-medium w-full md:w-auto"
          placeholder="Enter your preferred address"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-[#243B55] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#1b2d40] focus:ring-2 focus:ring-offset-2 focus:ring-[#1b2d40] w-full md:w-auto"
      >
        Search
      </button>

      {/* Dropdown for Room Type */}
      <div className="relative w-full md:w-auto bg-[#E7F8FD] px-3 py-2 rounded-lg flex items-center">
        <img src="../img/house.svg" alt="house" className="h-6 w-6 mr-2" />
        <select
          className="bg-transparent focus:outline-none text-[#243B55] text-sm font-medium w-full md:w-auto"
          value={roomType}
          onChange={handleSelectChange}
        >
          <option value="has_room">Looking for Roommate with Room</option>
          <option value="!has_room">Looking for Roommate without Room</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
