import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/ProgressIndicator";
import Notification from "../components/Notification";

const BudgetAndRoom = ({ formData, updateFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Validation function
  const validateForm = () => {
    if (!formData.min_budget || formData.min_budget <= 0) {
      return "Minimum Budget is required and must be a positive number.";
    }
    if (!formData.max_budget || formData.max_budget <= 0) {
      return "Maximum Budget is required and must be a positive number.";
    }
    if (parseFloat(formData.min_budget) > parseFloat(formData.max_budget)) {
      return "Minimum Budget cannot be greater than Maximum Budget.";
    }
    if (formData.has_room === undefined || formData.has_room === "") {
      return "Please select if you have a room.";
    }
    return ""; // No error
  };

  const handleNext = () => {
    const error = validateForm();
    if (error) {
      Notification(`❌ ${error}`, "error");
    } else {
      navigate("/summary"); // Navigate if no errors
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <ProgressIndicator />
        <div className="w-full max-w-3xl bg-primary shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-secondary text-center">Budget & Room Details</h2>


          <form className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Minimum Budget</label>
              <input
                type="number"
                name="min_budget"
                value={formData.min_budget || ""}
                onChange={handleChange}
                placeholder="Enter minimum budget"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Maximum Budget</label>
              <input
                type="number"
                name="max_budget"
                value={formData.max_budget || ""}
                onChange={handleChange}
                placeholder="Enter maximum budget"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Has Room?</label>
              <select
                name="has_room"
                value={formData.has_room || ""}
                onChange={(e) => handleChange({ target: { name: "has_room", value: e.target.value === "true" } })}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select an option</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </form>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/preferences")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleNext} // Use the handleNext function for validation
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetAndRoom;
