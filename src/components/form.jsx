import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import Joi from "joi";
import useForm from "./../hook/useForm";

const Form = () => {
  const AGE_REQUIREMENT = 18;
  const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthdate: dayjs().subtract(AGE_REQUIREMENT, "year").format(),
  };

  const lettersOnly = /^[a-zA-Zà-ÿÀ-Ÿ]+$/;
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(25)
      .required()
      .pattern(new RegExp(lettersOnly))
      .messages({
        "string.pattern.base": `"First name" must only contain alphabetical characters`,
      })
      .label("First name"),
    lastName: Joi.string()
      .min(2)
      .max(25)
      .required()
      .pattern(new RegExp(lettersOnly))
      .messages({
        "string.pattern.base": `"Last name" must only contain alphabetical characters`,
      })
      .label("Last name"),
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required()
      .label("Email address"),
    password: Joi.string().min(8).max(255).required().label("Password"),
    birthdate: Joi.date()
      .custom((value, helpers) => {
        const age = dayjs().diff(dayjs(value), "year");
        if (age < 18) return helpers.error("date.invalid");
        return value;
      })
      .messages({
        "date.invalid": `"Age" must be at least 18 years old`,
      })
      .label("Birth date"),
  });

  const doSubmit = (data) => {
    console.log("SUBMITTED", data);
  };

  const [
    renderInput,
    renderCalendar,
    renderNotice,
    renderButton,
    validateSubmit,
  ] = useForm(initialData, schema, doSubmit);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ my: "4rem" }}>
        useForm custom hook with Joi validation
      </Typography>
      <form onSubmit={validateSubmit} noValidate autoComplete="on">
        <Grid container spacing="2rem">
          <Grid item xs={12} md={6}>
            {renderInput("firstName", "First name", "text")}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderInput("lastName", "Last name", "text")}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderInput("email", "Email address", "email")}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderInput("password", "Password", "password")}
          </Grid>
          <Grid item xs={12} sm={6}>
            {renderCalendar("birthdate", "Birth date")}
          </Grid>
          <Grid item xs={12}>
            {renderButton("Submit form")}
          </Grid>
        </Grid>
      </form>
      {renderNotice()}
    </Box>
  );
};

export default Form;
