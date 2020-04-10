import { useState, useEffect } from "react";
 
const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const onChangeText = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  const onFailed = (error) => {
    const failed = {};
    error.inner.forEach((err) => (failed[err.path] = err.message));
    setErrors(failed);
    return failed;
  };

  const onValidate = async (schema) => {
    setErrors({});
    await schema.validate(values, {
      abortEarly: false,
      stripUnknown: true,
    });

    return schema;
  };

  const setError = (name, value) => {
    setErrors({ ...errors, [name]: value });
  };

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
