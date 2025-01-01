import React, { useState } from 'react';

const FormComponent = ({ fields, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
            type={field.type || 'text'}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder || ''}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required={field.required || false}
          />
        </div>
      ))}

{/* Remember Me and Forgot Password or Terms and Conditions */}
{buttonText !== "Register" ? (
  <div className="flex items-center justify-between">
    <div className="flex items-start">
      <input
        id="remember"
        type="checkbox"
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
          className="font-medium text-[#243B55] hover:underline dark:text-primary-500"
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
        >
          {buttonText || 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
