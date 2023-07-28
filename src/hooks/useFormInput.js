import { useState } from "react";

const getErrorFields = (inputs, validations) =>
  Object.keys(inputs).reduce((acc, field) => {
    if (!validations[field]) return { ...acc };

    const fieldErrors = validations[field]
      .map((validation) => ({
        isValid: validation.isValid(inputs[field]),
        message: validation.message,
      }))
      .filter((vettedInput) => !vettedInput.isValid);

    return { ...acc, [field]: fieldErrors };
  }, {});

const getDirtyFields = (inputs, initialInputs) =>
  Object.keys(inputs).reduce((acc, field) => {
    const isDirty = !inputs[field] || inputs[field] !== initialInputs[field];
    return { ...acc, [field]: isDirty };
  }, {});

const sanitize = (inputs) =>
  Object.keys(inputs).reduce((acc, field) => {
    return { ...acc, [field]: inputs[field].trim() };
  }, {});

const useFormInput = (initialInputs, validations) => {
  const [formInputs, setFormInputs] = useState(initialInputs);
  const [dirtyFields, setDirtyFields] = useState({});

  const errorFields = getErrorFields(formInputs, validations);

  const isDirtyWithError = (field) => {
    return errorFields[field]?.length > 0 && dirtyFields[field];
  };

  const getErrorMessage = (field) => {
    if (errorFields[field]?.length > 0) return errorFields[field][0].message;
    return null;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormInputs({
      ...formInputs,
      [id]: value,
    });
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setDirtyFields((prevState) => {
      return {
        ...prevState,
        ...getDirtyFields({ [id]: value }, initialInputs),
      };
    });
    // Sanitize inputs
    setFormInputs((prevInputs) => ({
      ...prevInputs,
      ...sanitize({ [id]: value }),
    }));
  };

  const smudgeInputs = () => {
    setDirtyFields(
      Object.keys(formInputs).reduce((acc, key) => {
        return { ...acc, [key]: true };
      }, {})
    );
  };

  const hasError = Object.values(errorFields).flat().length > 0;
  // const isSmudged = Object.values(dirtyFields).some((bool) => bool);

  const reset = () => {
    setFormInputs(initialInputs);
    setDirtyFields({});
  };

  return {
    formInputs,
    hasError,
    isDirtyWithError,
    getErrorMessage,
    handleChange,
    handleBlur,
    smudgeInputs,
    reset,
  };
};

export default useFormInput;
