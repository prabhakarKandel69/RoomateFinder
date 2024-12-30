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
      <div className="flex justify-end items-center">
            <button
                type="submit"
                className="px-4 py-2  text-white rounded-md  bg-[#243B55]  "
            >
                {buttonText || 'Submit'}
            </button>
     </div>

     
    </form>
  );
};

export default FormComponent;
