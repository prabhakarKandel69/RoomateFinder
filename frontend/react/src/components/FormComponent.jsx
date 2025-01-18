import React, { useState, useEffect } from "react";
import ValidateComponent from "./ValidateComponent";

const FormComponent = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue || "",
      }),
      {}
    )
  );
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Check for saved user data in localStorage when the component mounts
  useEffect(() => {
    const savedState = localStorage.getItem("rememberMe");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedState === "true" && savedUser) {
      setRememberMe(true);
      setFormData({
        email: savedUser.email || "",
        password: savedUser.password || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const fieldConfig = fields.find((field) => field.name === name);
    const error = ValidateComponent(fieldConfig, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("user", JSON.stringify({ username: formData.username, email: formData.email }));
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("user");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = fields.some((field) => {
      const error = ValidateComponent(field, formData[field.name]);
      setErrors((prevErrors) => ({ ...prevErrors, [field.name]: error }));
      return error !== "";
    });

    if (!hasErrors) {
      onSubmit(formData);
    }
  };

  const isFormValid = !Object.values(errors).some((error) => error !== "");

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col">
          <label htmlFor={field.name} className="mb-1 font-medium text-gray-700">
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder || ""}
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors[field.name]
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required={field.required || false}
          />
          {errors[field.name] && (
            <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
      {/* Remember Me and Forgot Password or Terms and Conditions */}
      {buttonText !== "Register" ? (
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-[#243B55]"
          >
            Forgot password?
          </a>
        </div>
      ) : (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-500"
            >
              I accept the{" "}
              <a
                className="font-black text-black hover:underline dark:text-secondary"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
      )}


     

      <div className="flex justify-end items-center">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white rounded-md bg-[#243B55]"
          disabled={!isFormValid}
        >
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
