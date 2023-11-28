const yup = require("yup");

const signUpValidator = yup.object().shape({
  companyName: yup.string().required().min(8).max(255),
  userName: yup.string().required().min(6).max(32),
  password: yup.string().min(6).max(255),
  taxNumber: yup.string().min(11).max(11),
  taxAdministration: yup.string().required().max(255),
});

module.exports = signUpValidator;
