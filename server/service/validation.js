const joi = require("joi");

const validationSchema = joi.object({
  username: joi.string().required().min(5).messages({
    "any.required": "Please, enter your username",
    "string.empty": "Please, enter your username",
    "string.min": "Please, minimium character for string is 6 characters",
  }),
  email: joi.string().required().email().messages({
    "any.required": "Please, enter your email",
    "string.empty": "Please, enter your email",
    "string.email": "Please enter a valid email",
  }),
  password: joi.string().min(5).required().messages({
    "any.required": "Please password must not be empty",
    "string.empty": "Please password must not be empty",
    "string.min": "minimium length must be 5 characters",
  }),
  confirmPassword: joi.any().valid(joi.ref("password")).required().messages({
    "any.only": "passwords do not match",
    "any.required": "Please confirm your password",
  }),
});

const registerValidation = (body) => {
  const errorVals = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  const { error, value } = validationSchema.validate(body);
  if (error) {
    // console.log(error["details"][0]["path"][0]);
    let errorObj = error["details"][0];
    errorVals[errorObj["path"][0]] = errorObj["message"];
    return { errors: errorVals };
  } else {
    return { result: value };
  }
};

module.exports = registerValidation;
