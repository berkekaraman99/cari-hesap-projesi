module.exports = class UnauthorizedException extends Error {
  constructor(message) {
    super(message);
    this.message = message ?? "Unauthorized";
    this.statusCode = 401;
  }
};
