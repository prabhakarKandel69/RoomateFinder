const ValidateComponent = (field, value) => {
    let error = "";
  
    if (field.required && !value.trim()) {
      error = `${field.label || "This field"} is required.`;
    }
  
    if (field.validation) {
      if (field.validation.type === "text" && /\d/.test(value)) {
        error = `${field.label || "This field"} cannot contain numbers.`;
      }
      if (field.validation.type === "number" && isNaN(value)) {
        error = `${field.label || "This field"} must be a valid number.`;
      }
      if (
        field.validation.minLength &&
        value.length < field.validation.minLength
      ) {
        error = `${field.label || "This field"} must be at least ${field.validation.minLength} characters long.`;
      }
      if (field.validation.requiresNumeric && !/\d/.test(value)) {
        error = `${field.label || "This field"} must include at least one numeric character.`;
      }
      if (
        field.validation.requiresSpecial &&
        !/[!@#$%^&*(),.?":{}|<>]/.test(value)
      ) {
        error = `${field.label || "This field"} must include at least one special character.`;
      }
      if (
        field.validation.maxLength &&
        value.length > field.validation.maxLength
      ) {
        error = `${field.label || "This field"} must be no more than ${field.validation.maxLength} characters long.`;
      }
      if (field.validation.pattern && !field.validation.pattern.test(value)) {
        error = `${field.label || "This field"} is invalid.`;
      }
    }
  
    return error;
  };
  
  export default ValidateComponent;
  