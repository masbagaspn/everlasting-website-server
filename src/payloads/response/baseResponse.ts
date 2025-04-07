import {
  ApiExceptionType,
  getResponseCode,
} from "../../enums/ApiExceptionType";

export class BaseResponse<T> {
  responseCode!: string;
  responseMessage!: string;
  responseData?: T;

  constructor(
    responseData?: T,
    type: ApiExceptionType = ApiExceptionType.SUCCESS
  ) {
    this.responseCode = getResponseCode(type);
    this.responseMessage = type;
    this.responseData = responseData;
  }
}
