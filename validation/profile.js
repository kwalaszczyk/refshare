const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.interests = !isEmpty(data.interests) ? data.interests : "";

  if (!Validator.isLength(data.username, { min: 2, max: 40 })) {
    errors.username = "Username needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Profile username is required";
  }

  if (!isEmpty(data.website) && !Validator.isURL(data.website)) {
    errors.website = "Not a valid URL";
  }

  if (!isEmpty(data.twitter) && !Validator.isURL(data.twitter)) {
    errors.twitter = "Not a valid URL";
  }

  if (!isEmpty(data.youtube) && !Validator.isURL(data.youtube)) {
    errors.youtube = "Not a valid URL";
  }

  if (!isEmpty(data.linkedin) && !Validator.isURL(data.linkedin)) {
    errors.linkedin = "Not a valid URL";
  }

  if (!isEmpty(data.facebook) && !Validator.isURL(data.facebook)) {
    errors.facebook = "Not a valid URL";
  }

  if (!isEmpty(data.instagram) && !Validator.isURL(data.instagram)) {
    errors.instagram = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
