const { StatusCodes } = require("http-status-codes");
var responseBuilder = require("./responseBuilder.js");
const constant = require("./constant");

var send = (req, res, data, err, status) => {
  if (err) {
    return res
      .status(status ? status : StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseBuilder.errorResponse(err));
  } else if (data) {
    return res
      .status(StatusCodes.OK)
      .json(responseBuilder.successResponse(data));
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(responseBuilder.errorResponse(err));
  }
};

module.exports = {
  send: send,
};
