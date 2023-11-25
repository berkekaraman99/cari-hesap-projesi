const loginValidator = require("../validators/login_validator");

const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    await loginValidator
      .validate({
        userName,
        password,
      })
      .catch((_) => {
        throw new Error("Validation Error");
      });
  } catch (error) {
    return res.status(500).json({});
  }
};

const signup = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(500).json({});
  }
};

module.exports = { login, signup };
