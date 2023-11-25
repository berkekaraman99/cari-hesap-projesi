const JWT = require("jsonwebtoken");
const randomString = require("randomstring");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24 * 30; // 1 month
const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 30 * 2; // 2 months

const generateToken = (payload) => {
  const accessToken = JWT.sign({}, process.env.JWT_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  return {
    accessToken: accessToken,
    expiration: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION * 1000),
    refreshToken: "",
  };
};

const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET_KEY);
};

const generateResetPasswordToken = () => {
  return randomString.generate({
    length: 40,
    charset: "alphanumeric",
  });
};

module.exports = {
  generateToken,
  verifyToken,
  generateResetPasswordToken,
};
