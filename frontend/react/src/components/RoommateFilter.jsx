import React, { useState } from "react";
import { useEffect } from "react";
import { Range } from "react-range";
import MatchesSection from "../sections/MatchesSection";
import { handleSearch } from "../utils/Searchfunction";
import SearchBar from '../components/SearchBar';


const RoommateFilter = () => {
  const [matches, setMatches] = useState([]); // Initialize matches as an empty array

  const [filters, setFilters] = useState({
    gender: null,
    smoking_allowed: false,
    drinking_allowed: false,
    pets_allowed: false,
    early_riser: false,
    vegeterian: false,
    gender_same_prefer: false,
    introvert: false,
    min_budget: [0, 15000], // Initial range for budget
    age_range: [18, 30], // Initial range for age
    room_type: null,
  });


  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value === "true" ? true : value === "false" ? false : value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Transform filters for backend format
    const transformedFilters = {
      age_min: filters.age_range[0],
      age_max: filters.age_range[1],
      min_budget: filters.min_budget[0],
      max_budget: filters.min_budget[1],
      // address: null, // Replace this with an address field if available
      preferences: Object.keys(filters)
        .filter((key) => filters[key] === true) // Add boolean keys with true values
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/search/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedFilters),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("Filters applied successfully!");
        // console.log("Matches received:", result.matches); // Log result matches directly
        setMatches(result); // The backend response is the array of matches itself
      } else {
        console.error("Error:", response.statusText);
        alert("Failed to apply filters.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while applying filters.");
    }
  };

 // UseEffect to show the latest matches in the alert
 useEffect(() => {
  if (Array.isArray(matches) && matches.length > 0) { // Ensure matches is an array
    alert("Matches found: " + JSON.stringify(matches)); // Show matches in alert when updated
  }
}, [matches]); // Trigger the effect whenever 'matches' changes




  
  

  return (
    <>
    <SearchBar onSearch={handleSearch} />
    <div className="flex flex-col lg:flex-row  bg-[#E7F8FD] p-6">
      {/* Filter Section */}
      <div className="h-[100vh] overflow-auto lg:w-1/4 bg-white p-6 shadow-lg rounded-lg m-5 ">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16M4 15h16M4 21h16" />
          </svg>
          Filters
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-inter font-medium text-gray-700 mb-2">Gender Preferences</label>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleChange}
              className="block w-full border bg-primary border-blue-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm  font-inter font-medium text-gray-700 mb-2">Room Type</label>
            <select
              name="room_type"
              value={filters.room_type}
              onChange={handleChange}
              className="block w-full bg-primary border border-blue-300 rounded-lg shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="">Any</option>
              <option value="shared">Shared Room</option>
              <option value="private">Private Room</option>
            </select>
          </div>

          {/* Boolean Filters */}
          <div className="space-y-4">
            {[
              { label: "Smoking Allowed", name: "smoking_allowed" },
              { label: "Drinking Allowed", name: "drinking_allowed" },
              { label: "Pets Allowed", name: "pets_allowed" },
              { label: "Early Riser", name: "early_riser" },
              { label: "Vegetarian", name: "vegeterian" },
              { label: "Same Gender Preference", name: "gender_same_prefer" },
              { label: "Introvert", name: "introvert" },
            ].map(({ label, name }) => (
              <div key={name} className="space-y-2">
                <span className="block text-sm font-inter font-medium text-gray-700">{label}</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={name}
                      value="true"
                      checked={filters[name] === true}
                      onChange={handleChange}
                      className="h-4 w-4 appearance-none rounded-full bg-primary checked:bg-secondary checked:ring-2 checked:ring-primary focus:ring-1 focus:ring-primary"
                      />
                    <span className="text-sm text-gray-700">Allowed</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={name}
                      value="false"
                      checked={filters[name] === false}
                      onChange={handleChange}
                      className="h-4 w-4 appearance-none rounded-full bg-primary checked:bg-secondary checked:ring-2 checked:ring-primary focus:ring-1 focus:ring-primary"
                      />
                    <span className="text-sm text-gray-700">Not Allowed</span>
                  </label>
                </div>
              </div>
            ))}
          </div>


          {/* Budget Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range (Rs)</label>
            <div className="text-sm text-gray-600 mb-2">
              Rs {filters.min_budget[0]} - Rs {filters.min_budget[1]}
            </div>
            <Range
              step={500}
              min={0}
              max={30000}
              values={filters.min_budget}
              onChange={(values) => setFilters({ ...filters, min_budget: values })}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 bg-blue-300 rounded-full"
                  style={{ ...props.style, width: "100%" }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 bg-secondary rounded-full border border-gray-300 shadow-md"
                />
              )}
            />
          </div>

          {/* Age Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
            <div className="text-sm text-gray-600 mb-2">
              {filters.age_range[0]} - {filters.age_range[1]} years
            </div>
            <Range
              step={1}
              min={18}
              max={65}
              values={filters.age_range}
              onChange={(values) => setFilters({ ...filters, age_range: values })}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 bg-blue-300 rounded-full"
                  style={{ ...props.style, width: "100%" }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-5 w-5 bg-secondary rounded-full border border-gray-300 shadow-md"
                />
              )}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white font-semibold py-3 px-4 rounded-lg shadow hover:from-blue-400 hover:to-secondary transition duration-200"
          >
            Apply Filters
          </button>
        </form>
      </div>
      

      {/* Results Section */}
      <div className="w-full lg:w-3/4 p-3">
      
        <div className="h-[100vh] overflow-auto bg-[#E7F8FD] rounded-lg p-0 mt-3 hide-scrollbar">
        <MatchesSection matches={matches} /> {/* Pass matches as prop */}
        </div>
      </div>
    </div>
    </>
  );
};

export default RoommateFilter;
