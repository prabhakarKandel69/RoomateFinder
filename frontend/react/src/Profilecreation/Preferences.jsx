import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../components/ProgressIndicator";

const Preferences = ({ formData, updateFormData }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value === "yes" });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-primary">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <ProgressIndicator />
          <div className="w-full bg-primary shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-secondary text-center">Preferences</h2>
            <form className="grid grid-cols-1 gap-4">
              {[
                { name: "smoking_allowed", label: "Smoking" },
                { name: "drinking_allowed", label: "Drinking" },
                { name: "pets_allowed", label: "Pets Friendly" },
                { name: "early_riser", label: "Early Riser" },
                { name: "vegeterian", label: "Vegetarian" },
                { name: "introvert", label: "Introvert" }
              ].map((item) => (
                <div key={item.name} className="flex justify-between items-center  p-3 rounded-lg ">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <div className="flex space-x-3">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={item.name}
                        value="yes"
                        checked={formData[item.name] === true}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span
                        className={`px-4 py-1 rounded-full cursor-pointer transition ${
                          formData[item.name] === true
                            ? "bg-secondary text-white"
                            : "bg-gray-300 text-gray-700 hover:bg-secondary hover:text-white"
                        }`}
                      >
                         Yes
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={item.name}
                        value="no"
                        checked={formData[item.name] === false}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span
                        className={`px-4 py-1 rounded-full cursor-pointer transition ${
                          formData[item.name] === false
                            ? "bg-secondary text-white"
                            : "bg-gray-300 text-gray-700 hover:bg-gray-500 hover:text-white"
                        }`}
                      >
                        No
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </form>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/contact-info")}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/budget-room")}
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

export default Preferences;
