"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function partialResponse(data, error) {
  var response = {
    data: data,
    error: error,
  };
  return response;
}

function successResponseWithPagination(
  name,
  data,
  message,
  result,
  page = constant.PAGINATION.PAGE,
  size = constant.PAGINATION.SIZE
) {
  let response = {
    name: name,
    currentPage: parseInt(page),
    pageSize: parseInt(size),
    totalPages: Math.ceil(result / size),
    totalCount: result,
    data: data,
    message: message,
  };
  return response;
}

function successResponse(data, message) {
  var response = {
    data: data,
    message: message,
  };
  return response;
}
function errorResponse(message) {
  var response = {
    data: null,
    error_message: message,
  };
  return response;
}
module.exports = {
  partialResponse: partialResponse,
  successResponse: successResponse,
  errorResponse: errorResponse,
  successResponseWithPagination: successResponseWithPagination,
};
