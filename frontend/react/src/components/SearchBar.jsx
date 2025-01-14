import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roomType, setRoomType] = useState("have room"); // State for dropdown value

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSelectChange = (e) => {
    setRoomType(e.target.value); // Update the room type state when the dropdown value changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      // Pass both search term and selected room type to onSearch function
      onSearch({ searchTerm, roomType });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white p-3 mt-2 rounded-lg shadow-sm max-w-3xl mx-auto space-x-3"
    >
      {/* Input Field */}
      <div className="flex items-center flex-grow bg-[#E7F8FD] rounded-lg px-3 py-2">
        <span className="text-[#243B55] text-lg mr-2">
          <img
            src="../img/location.svg"
            alt="location"
            className="h-[24px] w-[24px] mr-1"
          />
        </span>
        <input
          type="text"
          className="flex-grow bg-transparent focus:outline-none text-[#243B55] text-sm"
          placeholder="Enter your preferred address"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="bg-[#243B55] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-[#1b2d40] focus:ring-2 focus:ring-offset-2 focus:ring-[#1b2d40]"
      >
        Search
      </button>

      {/* Dropdown */}
      <div className="relative bg-[#E7F8FD] px-3 py-2 rounded-lg flex items-center">
        <span className="text-[#243B55] text-lg mr-2">
          <img
            src="../img/house.svg"
            alt="house"
            className="h-[24px] w-[24px] mr-1"
          />
        </span>
        <select
          className="bg-primary focus:outline-none text-secondary text-sm font-bold"
          value={roomType}
          onChange={handleSelectChange}
        >
          <option value="have room" className="text-secondary font-bold">
            Looking for Roommate with Room
          </option>
          <option value="no room" className="text-secondary font-bold">
            Looking for Roommate without Room
          </option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
