const userService = require("../services/userService");
const constantVariables = require("../utilities/constant");
const { StatusCodes } = require("http-status-codes");
const { responseDataFormat } = require("../utilities/metadata");
const bcrypt = require("bcrypt");
const responseHandler = require("../utilities/responseHandler");

const UserController = {
  create: async (req, res) => {
    try {
      const { password, ...info } = req.body;
      const salt = await bcrypt.genSalt(10);
      const encryPass = await bcrypt.hash(password, salt);
      const data = {
        password: encryPass,
        ...info,
      };
      userService
        .create(data)
        .then((result) => {
          return res
            .status(StatusCodes.CREATED)
            .json({ message: constantVariables.MESSAGE.USER.CREATED });
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
      let { page, size, field, value } = req.query;

      userService
        .getAll(page, size, field, value)
        .then((result) => {
          let data = result.rows.map((user) => {
            const { password, ...info } = user.dataValues;
            return info;
          });
          return res
            .status(StatusCodes.OK)
            .send(responseDataFormat("User Page", page, size, result, data));
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  getById: (req, res) => {
    try {
      userService
        .getById(req.params.id)
        .then((result) => {
          let { password, ...data } = result.dataValues;
          return res.status(StatusCodes.OK).send(data);
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  getByToken: async (req, res) => {
    try {
      const { password, ...info } = req.user;
      return res.status(StatusCodes.OK).json({ data: info });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  userStatus: async (req, res) => {
    try {
      const { id, isActive } = req.body;
      if (id == undefined || isActive == undefined) {
        responseHandler.send(
          req,
          res,
          null,
          constantVariables.MESSAGE.USER.USER_STATUS_INPUTS,
          null
        );
      }

      userService
        .getById(id)
        .then((user) => {
          userService.updateStatus(isActive, id);
          return res.status(StatusCodes.OK).json({
            message: `${constantVariables.MESSAGE.USER.USER_STATUS_VALUE} ${isActive}`,
          });
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
