const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRefsInput(data) {
  let validationErrors = {};

  if (isEmpty(data.name)) {
    validationErrors.name = `${
      data.isFolder ? "Name of folder" : "URL"
    } cannot be empty`;
  }

  if (!isEmpty(data.name) && !data.isFolder && !Validator.isURL(data.name)) {
    validationErrors.name = "Not a valid URL";
  }

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  };
};
