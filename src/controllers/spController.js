const constantVariables = require("../utilities/constant");
const { StatusCodes } = require("http-status-codes");
const responseHandler = require("../utilities/responseHandler");
const SpService = require("../services/spService");

const SpController = {
  get: (req, res) => {
    try {
      SpService.getAll()
        .then((result) => {
          return res
            .status(StatusCodes.OK)
            .send({ message: "User Role Page", data: result });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  getUser: (req, res) => {
    try {
      SpService.getAllUser()
        .then((result) => {
          return res
            .status(StatusCodes.OK)
            .send({ message: "User Page", data: result });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
};
module.exports = SpController;
