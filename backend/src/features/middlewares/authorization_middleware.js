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

  next();
}
