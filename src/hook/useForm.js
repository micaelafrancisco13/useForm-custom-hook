import React, { useState } from "react";
import { Button } from "@mui/material";
import Calendar from "../common/calendar";
import InputField from "../common/input-field";
import Joi from "joi";

export default function useForm(initialData, schema, doSubmit) {
  const [data, setData] = useState({
    ...initialData,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const { error } = schema.validate(data);

    if (!error) return null;

    const newErrors = {};
    for (let item of error.details)
      newErrors[item.path[0]] = `${item.message}.`;
    return newErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };

    const rule = Joi.object({
      [name]: schema.extract(name),
    });
    const { error } = rule.validate(obj);

    return error ? `${error.details[0].message}.` : null;
  };

  const handleOnChange = ({ currentTarget: input }) => {
    const newErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    const newData = { ...data };

    newData[input.name] = input.value;

    setData({ ...newData });
    setErrors({ ...newErrors });
  };

  const validateSubmit = (event) => {
    event.preventDefault();

    const newErrors = validate();
    setErrors({ ...(newErrors || {}) });
    if (!newErrors) doSubmit(data);
  };

  const renderInput = (name, label, type) => {
    return (
      <InputField
        name={name}
        label={label}
        error={errors[name] !== undefined}
        value={data[name]}
        type={type}
        onChange={handleOnChange}
        helperText={errors[name]}
      />
    );
  };

  const renderCalendar = (name, label) => {
    return (
      <Calendar
        name={name}
        label={label}
        error={errors[name] !== undefined}
        helperText={errors[name]}
        inputFormat={"MM/DD/YYYY"}
        value={data[name]}
        onChange={handleOnChange}
      />
    );
  };

  const renderNotice = () => {
    if (validate()) {
      // show some modal or alert
    }
  };

  const renderButton = (label) => {
    return (
      <Button type="submit" variant="contained">
        {label}
      </Button>
    );
  };

  return [
    renderInput,
    renderCalendar,
    renderNotice,
    renderButton,
    validateSubmit,
  ];
}
