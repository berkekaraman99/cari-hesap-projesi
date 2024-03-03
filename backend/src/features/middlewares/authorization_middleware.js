import jwt from "jsonwebtoken";
import BaseResponse from "../../core/response/base_response.js";

export default function authorizationMiddleware(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json(BaseResponse.fail("Unauthorized", 401));
  }
  const token = bearerToken.split(" ")[1];
  if (!token) {
    return res.status(401).json(BaseResponse.fail("Unauthorized", 401));
  }
  const restaurantId = getRestaurantIdFromToken(token);

  if (!restaurantId || !isValidUUIDv4(restaurantId)) {
    return res.status(401).json(BaseResponse.fail("Unauthorized", 401));
  }

  req.body.restaurantId = restaurantId;
  req.body.role = getRoleFromToken(token);
  next();
}
function getRestaurantIdFromToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedToken) {
    return null;
  } else {
    return decodedToken.id;
  }
}
function getRoleFromToken(token) {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!decodedToken) {
    return null;
  }
  return decodedToken.role;
}
const isValidUUIDv4 = (uuid) => {
  const uuidv4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidv4Pattern.test(uuid);
};
