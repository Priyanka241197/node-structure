const constantVariables = require("../utilities/constant");
const { StatusCodes } = require("http-status-codes");
const responseHandler = require("../utilities/responseHandler");
const MultipleDataService = require("../services/multipleDataService");

const MultipleDataController = {
  get: (req, res) => {
    try {
      MultipleDataService.get()
        .then((result) => {
          return res.status(StatusCodes.OK).json({
            message: "Data Retrive",
            data: result,
          });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, null);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  create: async (req, res) => {
    try {
      MultipleDataService.create(req.body)
        .then((result) => {
          MultipleDataService.tableTwoCreate({
            ...req.body,
            tableOneId: result.dataValues.id,
          })
            .then((resultTwo) => {
              return res.status(StatusCodes.CREATED).json({
                message: constantVariables.MESSAGE.USERROLE.CREATED,
                data: resultTwo.dataValues,
              });
            })
            .catch((error) => {
              responseHandler.send(
                req,
                res,
                null,
                error,
                StatusCodes.BAD_REQUEST
              );
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
      MultipleDataService.update(req.body.tableOne)
        .then((result) => {
          MultipleDataService.updateTableTwo({
            ...req.body.tableTwo,
            tableOneId: req.body.tableOne.id,
          })
            .then((resultTwo) => {
              return res.status(StatusCodes.CREATED).json({
                message: constantVariables.MESSAGE.USERROLE.CREATED,
                data: resultTwo,
              });
            })
            .catch((error) => {
              responseHandler.send(
                req,
                res,
                null,
                error,
                StatusCodes.BAD_REQUEST
              );
            });
        })
        .catch((error) => {
          responseHandler.send(req, res, null, error, StatusCodes.BAD_REQUEST);
        });
    } catch (error) {
      responseHandler.send(req, res, null, error, null);
    }
  },
  delete: (req, res) => {
    MultipleDataService.deleteTwo(req.params.id)
      .then((result) => {
        MultipleDataService.deleteOne(req.params.id)
          .then((result) => {
            return res.status(StatusCodes.CREATED).json({
              message: constantVariables.MESSAGE.USERROLE.DELETE,
            });
          })
          .catch((error) => {
            responseHandler.send(
              req,
              res,
              null,
              error,
              StatusCodes.BAD_REQUEST
            );
          });
      })
      .catch((error) => {
        responseHandler.send(req, res, null, error, StatusCodes.BAD_REQUEST);
      });
  },
};
module.exports = MultipleDataController;
