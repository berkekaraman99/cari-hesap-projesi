import JWT from "jsonwebtoken";
import randomString from "randomstring";

const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 24 * 30; // 1 month
const REFRESH_TOKEN_EXPIRATION = 60 * 60 * 24 * 30 * 2; // 2 months

export const generateToken = (payload) => {
  const accessToken = JWT.sign({ id: payload.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
  return {
    accessToken: accessToken,
    expiration: new Date(Date.now() + ACCESS_TOKEN_EXPIRATION * 1000),
    refreshToken: "",
  };
};

export const decodeToken = (payload) => {
  const decodedToken = JWT.verify(payload, process.env.JWT_SECRET_KEY);

  return decodedToken;
};

export const verifyToken = (token) => {
  return JWT.verify(token, process.env.JWT_SECRET_KEY);
};

export const generateResetPasswordToken = () => {
  return randomString.generate({
    length: 40,
    charset: "alphanumeric",
  });
};
