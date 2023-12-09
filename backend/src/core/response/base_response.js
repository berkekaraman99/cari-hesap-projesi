export default class BaseResponse {
  constructor(data, isSuccess, statusCode, errors) {
    this.data = data;
    this.isSuccess = isSuccess;
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static success(data, statusCode = 200) {
    return new BaseResponse(data, true, statusCode, null);
  }

  static fail(errors, statusCode = 500) {
    return new BaseResponse(null, false, statusCode, errors);
  }
}
