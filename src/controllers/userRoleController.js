const userRoleService = require("../services/userRoleService");
const constantVariables = require("../utilities/constant");
const { StatusCodes } = require("http-status-codes");
const responseHandler = require("../utilities/responseHandler");

const UserController = {
  create: async (req, res) => {
    try {
      userRoleService
        .create({ ...req.body, isActive: true })
        .then((result) => {
          return res.status(StatusCodes.CREATED).json({
            message: constantVariables.MESSAGE.USERROLE.CREATED,
            data: result.dataValues,
          });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, StatusCodes.BAD_REQUEST);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  update: async (req, res) => {
    try {
      userRoleService
        .update(req.body, req.body.id)
        .then((result) => {
          return res.status(StatusCodes.CREATED).json({
            message: constantVariables.MESSAGE.USERROLE.UPDATED,
            data: req.body,
          });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, StatusCodes.BAD_REQUEST);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  get: (req, res) => {
    try {
      userRoleService
        .getAll()
        .then((result) => {
          let data = [];
          if (result?.length > 0) {
            data = result?.map((user) => {
              return user.dataValues;
            });
          }
          return res
            .status(StatusCodes.OK)
            .send({ message: "User Role Page", data: data });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  deleteUserRole: (req, res) => {
    try {
      userRoleService
        .deleteUserRole(req.body.id)
        .then((result) => {
          return res
            .status(StatusCodes.OK)
            .json({ message: constantVariables.MESSAGE.USERROLE.DELETE });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
};
module.exports = UserController;
