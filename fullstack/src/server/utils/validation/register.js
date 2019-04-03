const validator = require("validator");
const isEmpty = require("is-empty");

function validateRegisterInput(data) {
  const errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  if (validator.isEmpty(data.name)) { errors.name = "Name is required"; }

  if (validator.isEmpty(data.email)) { errors.email = "Email is required";}
  else if (!validator.isEmail(data.email)) { errors.email = "Email is invalid"; }

  // Password checks
  if (validator.isEmpty(data.password)) {errors.password = "Password field is required";}

  if (validator.isEmpty(data.confirmPassword)) {errors.confirmPassword = "Confirm password field is required";}

  if (!validator.isLength(data.password, { min: 6, max: 20 })) {errors.password = "Password must be from 6 to 20 characters";}

  if (!validator.equals(data.password, data.confirmPassword)) {errors.confirmPassword = "Passwords shold match";}

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
