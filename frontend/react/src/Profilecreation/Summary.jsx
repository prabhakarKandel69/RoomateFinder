import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProgressIndicator from "../components/ProgressIndicator";
import Notification from "../components/Notification";

const Summary = ({ formData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get access token from local storage
  const getAccessToken = () => localStorage.getItem("accessToken");

  // Function to refresh token
  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refrehToken");
      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", { refresh: refreshToken });

      localStorage.setItem("accessToken", response.data.access);
      return response.data.access; // Return new token
    } catch (error) {
      console.error("Failed to refresh token:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return null;
    }
  };

  // Function to submit form
const handleSubmit = async () => {
  setLoading(true);
  let accessToken = getAccessToken();

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/profile/", formData, {
      headers: {
        "Content-Type": "application/json",
        "Content-Type": "multipart/form-data", // Correct content type for file upload

        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Use Notification for success
    Notification("🎉 Profile Submitted Successfully!", "success");

    // Optionally redirect after success
    setTimeout(() => navigate("/dashboard"), 1000);
  } catch (error) {
    if (error.response?.status === 401) {
      // Unauthorized: Try refreshing token
      accessToken = await refreshAccessToken();

      if (accessToken) {
        try {
          const retryResponse = await axios.post("http://127.0.0.1:8000/api/profile/", formData, {
            headers: {
              "Content-Type": "application/json",
              "Content-Type": "multipart/form-data", // Correct content type for file upload

              Authorization: `Bearer ${accessToken}`,
            },
          });

          // Use Notification for success on retry
          Notification("🎉 Profile Submitted Successfully after retry!", "success");

          setTimeout(() => navigate("/dashboard"), 1000); 
        } catch (retryError) {
          // Handle retry error
          const errorMsg = retryError.response?.data?.error || "Submission failed after retry.";
          Notification(`❌ ${errorMsg}`, "error");
        }
      } else {
        // Session expired error
        Notification("❌ Session expired! Please log in again.", "error");
      }
    } else {
      // Handle other errors, including "Profile already exists"
      const errorMsg = error.response?.data?.error || "Something went wrong!";
      if (errorMsg === "Profile already exists") {
        // Display specific error message
        Notification("❌ Profile already exists. Please update your profile.", "error");
      } else {
        // Generic error message
        Notification(`❌ Error: ${errorMsg}`, "error");
      }
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <ProgressIndicator />
        <div className="w-full bg-primary shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-secondary text-center">Summary</h2>

          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            {formData.profile_pic? (
              <img
                src={formData.profile_pic}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-secondary"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="space-y-4 text-gray-700">
            <div className="bg-white p-3 rounded-lg">{formData.description}</div>
            <div className="bg-white p-3 rounded-lg">
              <strong className="text-secondary">Full Name:</strong> {formData.first_name} {formData.last_name}
            </div>
            <div className="bg-white p-3 rounded-lg">
              <strong className="text-secondary">Phone Number:</strong> {formData.phone_number}
            </div>
            <div className="bg-white p-3 rounded-lg">
              <strong className="text-secondary">Age:</strong> {formData.age}
            </div>
            <div className="bg-white p-3 rounded-lg">
              <strong className="text-secondary">Gender:</strong>{" "}
              {formData.gender === "M" ? "Male" : formData.gender === "F" ? "Female" : "Other"}
            </div>
            <div className="bg-white p-3 rounded-lg">
              <strong className="text-secondary">Address:</strong> {formData.address || "Not Provided"}
            </div>
            {/* Preferences Section */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-secondary mb-2 text-center">Preferences:</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "smoking_allowed", label: "Smoking" },
                  { name: "drinking_allowed", label: "Drinking" },
                  { name: "pets_allowed", label: "Pets Friendly" },
                  { name: "early_riser", label: "Early Riser" },
                  { name: "vegetarian", label: "Vegetarian" },
                  { name: "introvert", label: "Introvert" },
                ].map((item) => (
                  <div key={item.name} className="bg-white p-3 rounded-lg flex justify-between">
                    <span className="text-gray-700 font-medium">{item.label}</span>
                    <span className="text-gray-900">{formData[item.name] ? "Yes" : "No"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/budget-room")}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
