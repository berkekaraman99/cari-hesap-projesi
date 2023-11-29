const loginValidator = require("../validators/login_validator");
const db = require("../../../core/connection/mysql");
const signUpValidator = require("../validators/signup_validator");
const { generateToken, decodeToken } = require("../../../features/utils/token_helper");
const BaseResponse = require("../../../core/response/base_response");
const { hashPassword, comparePassword } = require("../../../features/utils/hash_password");
const UnauthorizedException = require("../../../core/exceptions/unauthorized_exception");

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

    const [row] = await db.query({ sql: "SELECT * FROM users WHERE user_name = ?", values: [userName] });
    console.log(row[0]);
    if (row.length === 0) {
      throw new UnauthorizedException("Invalid email or password");
    }
    if (!(await comparePassword(password, row[0].password))) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = generateToken({
      id: row[0].id,
    });

    return res.status(200).json(BaseResponse.success(token));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
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

    const hashedPassword = await hashPassword(password);

    const checkIsUserUnique = await db.query({
      sql: "SELECT * FROM users WHERE user_name = ?",
      values: [userName],
    });

    const checkIsTaxNumberUnique = await db.query({
      sql: "SELECT * FROM users WHERE tax_number = ?",
      values: [taxNumber],
    });

    if (checkIsUserUnique[0].length !== 0) {
      return res.status(200).json(BaseResponse.fail("Username is already exists", 1003));
    }

    if (checkIsTaxNumberUnique[0].length !== 0) {
      return res.status(200).json(BaseResponse.fail("Tax Number is already exists", 1004));
    }

    await db.query({
      sql: "INSERT INTO users (company_name, user_name, tax_number, tax_administration, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      values: [companyName, userName, taxNumber, taxAdministration, hashedPassword, createdAt],
    });

    const [getId] = await db.query({
      sql: "SELECT * FROM users where user_name = ?",
      values: [userName],
    });

    const token = generateToken({
      id: getId[0].id,
    });

    return res.status(200).json(BaseResponse.success(token, 201));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

const getUserAfterLogin = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedToken = decodeToken(token);
    const [row] = await db.query({ sql: "SELECT * FROM users WHERE id = ?", values: [decodedToken.id] });

    console.log(row[0]);
    return res.status(200).json(BaseResponse.success(row[0], 200));
  } catch (e) {
    return res.status(500).json(BaseResponse.fail(e.message, e.statusCode));
  }
};

module.exports = { login, signup, getUserAfterLogin };
