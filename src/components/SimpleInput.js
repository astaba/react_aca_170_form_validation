import React from "react";
import useFormInput from "../hooks/useFormInput";

const INITIAL_VALUE = {
  name: "",
  email: "",
};

const VALIDATIONS = {
  email: [
    {
      isValid: (value) => !!value,
      message: "Email is required",
    },
    {
      isValid: (value) => /\S+@\S+\.\S+/.test(value),
      message: "Please enter a valid email",
    },
  ],
  name: [
    {
      isValid: (value) => !!value,
      message: "Your name is required",
    },
    {
      isValid: (value) => /^\w{3,10}$/.test(value),
      message: "Please enter a valid name with 3 to 1O characters",
    },
  ],
};

const SimpleInput = () => {
  const {
    formInputs,
    hasError,
    isDirtyWithError,
    getErrorMessage,
    handleChange,
    handleBlur,
    smudgeInputs,
    reset,
  } = useFormInput(INITIAL_VALUE, VALIDATIONS);

 const handleSubmit = (e) => {
  e.preventDefault();
  smudgeInputs();
  if(hasError) return;
  const { name, email } = formInputs;
  alert(name + " - " + email);
  reset();
 }

  return (
    <form onSubmit={handleSubmit}>
      <div className={isDirtyWithError("name") ? "form-control invalid": "form-control"}>
        <label htmlFor="name">Your name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formInputs.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {isDirtyWithError("name") ? <p className="error-text">{getErrorMessage("name")}</p> : null}
      <div className={isDirtyWithError("email") ? "form-control invalid": "form-control"}>
        <label htmlFor="email">Your email address:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formInputs.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {isDirtyWithError("email") ? <p className="error-text">{getErrorMessage("email")}</p> : null}
      <div className="form-actions">
        <button disabled={hasError}>Save</button>
      </div>
    </form>
  );
};

export default SimpleInput;
