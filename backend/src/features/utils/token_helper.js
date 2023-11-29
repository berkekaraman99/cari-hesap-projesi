const JWT = require("jsonwebtoken");
const randomString = require("randomstring");

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24 * 30; // 1 month
const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 30 * 2; // 2 months

const generateToken = (payload) => {
  const accessToken = JWT.sign({ id: payload.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  return {
    accessToken: accessToken,
    expiration: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION * 1000),
    refreshToken: "",
  };
};

const decodeToken = (payload) => {
  const decodedToken = JWT.verify(payload, process.env.JWT_SECRET_KEY);

  return decodedToken;
};

exports.verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET_KEY);
};

exports.generateResetPasswordToken = () => {
  return randomString.generate({
    length: 40,
    charset: "alphanumeric",
  });
};

module.exports = { generateToken, decodeToken };
