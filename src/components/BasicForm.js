import React from "react";
import useFormInput from "../hooks/useFormInput";

const INITIAL_VALUE = {
  email: "",
  lastName: "",
  firstName: "",
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
  firstName: [
    {
      isValid: (value) => !!value,
      message: "Your first name is required",
    },
    {
      isValid: (value) => /^[A-Za-z\s-]{3,10}$/.test(value),
      // isValid: (value) => /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(value),
      message: "Please enter 3 to 1O characters",
    },
  ],
  lastName: [
    {
      isValid: (value) => !!value,
      message: "Your last name is required",
    },
    {
      isValid: (value) => /^[A-Za-z-]{3,10}$/.test(value),
      message: "Please enter 3 to 1O characters",
    },
  ],
};

const BasicForm = (props) => {
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
    const { firstName, lastName, email} = formInputs;
    alert(`${firstName} ${lastName}\n${email}`);
    reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="control-group">
        <div className={isDirtyWithError("firstName") ? "form-control invalid" : "form-control"}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formInputs.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {isDirtyWithError("firstName") ? <p className="error-text">{getErrorMessage("firstName")}</p> : null}
        <div className={isDirtyWithError("lastName") ? "form-control invalid" : "form-control"}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formInputs.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {isDirtyWithError("lastName") ? <p className="error-text">{getErrorMessage("lastName")}</p> : null}
      </div>
      <div className={isDirtyWithError("email") ? "form-control invalid" : "form-control"}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          value={formInputs.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {isDirtyWithError("email") ? <p className="error-text">{getErrorMessage("email")}</p> : null}
      <div className="form-actions">
        <button disabled={hasError}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
