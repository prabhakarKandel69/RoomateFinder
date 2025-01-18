import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/ProgressIndicator";
import Notification from "../components/Notification";

const ContactInfo = ({ formData, updateFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const validateForm = () => {
    if (!formData.address || formData.address.trim() === "") {
      return "Address is required.";
    }
    if (!formData.phone_number || !/^\d{10}$/.test(formData.phone_number)) {
      return "Phone number is required and must be 10 digits.";
    }
    return ""; // No errors
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const error = validateForm();
    if (error) {
      // Show the error message
      Notification(`❌ ${error}`, "error");

    } else {
      // Navigate to the next step if no errors
      navigate("/preferences");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <ProgressIndicator />
        <div className="w-full max-w-3xl bg-primary shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-secondary text-center">
            Contact Information
          </h2>

       

          <form className="grid gap-4" onSubmit={handleNext}>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                pattern="\d{10}" // Enforce a 10-digit phone number
                title="Phone number must be 10 digits."
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => navigate("/profile-creation")}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
              type="button"
              onClick={handleNext} // Use the handleNext function for navigation
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Next
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
