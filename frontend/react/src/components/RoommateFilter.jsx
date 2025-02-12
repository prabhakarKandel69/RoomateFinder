import React, { useState, useEffect, useCallback } from "react";
import { Range } from "react-range";
import MatchesSection from "../sections/MatchesSection";
import { handleSearch } from "../utils/Searchfunction";
import SearchBar from '../components/SearchBar';

const RoommateFilter = () => {
  const [matches, setMatches] = useState([]); // Stores search results

  const [filters, setFilters] = useState({
    gender: "",
    smoking_allowed: false,
    drinking_allowed: false,
    pets_allowed: false,
    early_riser: false,
    vegeterian: false,
    gender_same_prefer: false,
    introvert: false,
    min_budget: [0, 15000], // Budget range
    age_range: [18, 30], // Age range
    room_type: "",
  });

  // Function to handle input changes
  const handleChange = useCallback((e) => {
    const { name, type, value, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value === "true" ? true : value === "false" ? false : value,
    }));
  }, []);

  // Function to handle filter submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const transformedFilters = {
      age_min: filters.age_range[0],
      age_max: filters.age_range[1],
      min_budget: filters.min_budget[0],
      max_budget: filters.min_budget[1],
      preferences: Object.keys(filters).filter((key) => filters[key] === true),
    };

    try {
      const response = await fetch("http://127.0.0.1:7999/search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transformedFilters),
      });

      if (response.ok) {
        const result = await response.json();
        setMatches(result); // Update results
      } else {
        alert("Failed to apply filters.");
      }
    } catch (error) {
      alert("An error occurred while applying filters.");
    }
  };

  return (
    <>
      <SearchBar onSearch={(searchData) => handleSearch(searchData, setMatches)} />
      <div className="flex flex-col lg:flex-row bg-[#E7F8FD] p-6">
        
        {/* Filter Section */}
        <div className="h-[100vh] overflow-auto lg:w-1/4 bg-white p-6 shadow-lg rounded-lg m-5">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            Filters
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender Preferences</label>
              <select
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                className="block w-full border bg-primary border-blue-300 rounded-lg p-3"
              >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
              <select
                name="room_type"
                value={filters.room_type}
                onChange={handleChange}
                className="block w-full border bg-primary border-blue-300 rounded-lg p-3"
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
                <div key={name}>
                  <span className="block text-sm font-medium text-gray-700">{label}</span>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={name}
                        value="true"
                        checked={filters[name] === true}
                        onChange={handleChange}
                      />
                      <span>Allowed</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={name}
                        value="false"
                        checked={filters[name] === false}
                        onChange={handleChange}
                      />
                      <span>Not Allowed</span>
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
                onChange={(values) => setFilters((prev) => ({ ...prev, min_budget: values }))}
                renderTrack={({ props, children }) => (
                  <div {...props} className="h-2 bg-blue-300 rounded-full">{children}</div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="h-5 w-5 bg-secondary rounded-full border" />
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
                onChange={(values) => setFilters((prev) => ({ ...prev, age_range: values }))}
                renderTrack={({ props, children }) => (
                  <div {...props} className="h-2 bg-blue-300 rounded-full">{children}</div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="h-5 w-5 bg-secondary rounded-full border" />
                )}
              />
            </div>

            <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg shadow">
              Apply Filters
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="w-full lg:w-3/4 p-3">
          <div className="h-[100vh] overflow-auto bg-[#E7F8FD] rounded-lg p-0 mt-3">
            <MatchesSection matches={matches} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RoommateFilter;
