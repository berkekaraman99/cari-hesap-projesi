const yup = require("yup");

const loginValidator = yup.object().shape({
  userName: yup.string().required().min(6).max(20),
  password: yup.string().required().min(6).max(32),
});

module.exports = loginValidator;
