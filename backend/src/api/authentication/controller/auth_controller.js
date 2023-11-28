const loginValidator = require("../validators/login_validator");
const db = require("../../../core/connection/mysql");
const signUpValidator = require("../validators/signup_validator");

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

    var response = db.execute("SELECT * FROM users WHERE username = ?", [userName]);
    console.log(response);
  } catch (error) {
    return res.status(500).json({});
  }
};

const signup = async (req, res, next) => {
  try {
    const { companyName, userName, password, taxNumber, taxAdministration, createdAt } = req.body;
    await signUpValidator
      .validate({
        companyName,
        userName,
        password,
        taxNumber,
        taxAdministration,
      })
      .catch((_) => {
        throw new Error("Validation Error");
      });
  } catch (error) {
    return res.status(500).json({});
  }
};

module.exports = { login, signup };
