import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/ProgressIndicator";
import Notification from "../components/Notification";

const PersonalInfo = ({ formData, updateFormData }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(formData.profile_pic || ""); // Store image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set image preview
        updateFormData({ profile_pic: file }); // Store the actual file, not base64 string
      };
      reader.readAsDataURL(file); // Read the file as base64 for preview
    }
  };

  const validateForm = () => {
    if (!formData.first_name || formData.first_name.trim() === "") {
      return "First Name is required.";
    }
    if (!formData.last_name || formData.last_name.trim() === "") {
      return "Last Name is required.";
    }
    if (!formData.age || formData.age <= 0) {
      return "Age is required and must be a positive number.";
    }
    if (!formData.gender || formData.gender.trim() === "") {
      return "Gender is required.";
    }
    if (!formData.profile_pic) { // Check if file is selected
      return "Profile photo is required.";
    }
    return ""; // No error
  };

  const handleNext = () => {
    const error = validateForm();
    if (error) {
      // Delay setting the error message slightly to allow reset
      Notification(`❌ ${error}`, "error");
    } else {
      navigate("/contact-info"); // Navigate to the next page
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <ProgressIndicator />
          <div className="w-full max-w-3xl bg-primary shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-secondary text-center">Personal Information</h2>

            <form className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Describe Yourself"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  name="profile_pic"
                  onChange={handleFileChange}
                  required
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
                {preview && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300 mt-2">
                    <img src={preview} alt="Profile Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleNext} // Use the handleNext function for navigation
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
