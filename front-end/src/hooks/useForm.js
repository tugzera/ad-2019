import { useState, useEffect } from "react";

const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Set value from to a state
  const onChangeText = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  // Set errors state
  const onFailed = (error) => {
    const failed = {};
    error.inner.forEach((err) => (failed[err.path] = err.message));
    setErrors(failed);
    return failed;
  };

  // Try validate state based on schema
  const onValidate = async (schema) => {
    setErrors({});
    await schema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });

    return schema;
  };

  // Set error state
  const setError = (name, value) => {
    setErrors({ ...errors, [name]: value });
  };

  // Set value state
  const setValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  return {
    errors,
    onChangeText,
    onFailed,
    onValidate,
    setError,
    setValue,
    values,
    setValues,
  };
};

export default useForm;
