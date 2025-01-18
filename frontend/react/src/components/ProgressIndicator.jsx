import React from "react";
import { useLocation } from "react-router-dom";

const ProgressIndicator = () => {
  const location = useLocation();

  const steps = [
    { path: "/profile-creation", label: "Personal Info" },
    { path: "/contact-info", label: "Contact Info" },
    { path: "/preferences", label: "Preferences" },
    { path: "/budget-room", label: "Budget & Room" },
    { path: "/summary", label: "Summary" },
  ];

  const currentStepIndex = steps.findIndex((step) => step.path === location.pathname);

  return (
    <div className="flex justify-center items-center mb-6">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.path} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                index <= currentStepIndex ? "bg-secondary" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-8 h-1 ${
                  index < currentStepIndex ? "bg-secondary" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
