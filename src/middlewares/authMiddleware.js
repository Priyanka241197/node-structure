const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const constantVariables = require("../utilities/constant");

const isAuthenticate = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error(constantVariables.MESSAGE.JWT_TOKEN.NO_TOKEN);
    }
    jwt.verify(token, constantVariables.ACCESS_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ message: constantVariables.MESSAGE.JWT_TOKEN.INVALID_TOKEN });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: constantVariables.MESSAGE.JWT_TOKEN.NO_TOKEN, error });
  }
};
module.exports = isAuthenticate;
