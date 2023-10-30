const authService = require("../services/authService");
const constantVariables = require("../utilities/constant");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

let refresh_tokens = [];
const AuthController = {
  // LOGIN
  login: (req, res) => {
    try {
      authService
        .isEmailExists(req.body.email)
        .then(async (userDetails) => {
          if (userDetails == null) {
            return res
              .status(StatusCodes.NOT_FOUND)
              .json({ message: constantVariables.MESSAGE.USER.NOT_REGISTERED });
          } else {
            let decryPass = await bcrypt.compare(
              req.body.password,
              userDetails.password
            );
            if (!decryPass) {
              return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: constantVariables.MESSAGE.USER.LOGIN_FAILED });
            } else {
              const access_token = jwt.sign(
                userDetails.dataValues,
                constantVariables.ACCESS_SECRET_KEY,
                { expiresIn: "1h" }
              );
              const refresh_token = jwt.sign(
                userDetails.dataValues,
                constantVariables.REFRESH_SECRET_KEY,
                { expiresIn: "1y" }
              );
              refresh_tokens.push(refresh_token);
              return res.status(StatusCodes.OK).json({
                message: constantVariables.MESSAGE.USER.LOGIN_SUCCESS,
                email: req.body.email,
                accessToken: access_token,
                refreshToken: refresh_token,
              });
            }
          }
        })
        .catch((error) => {
          return res.status(StatusCodes.BAD_GATEWAY).json(error);
        });
    } catch (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
  },
  //REFRESH TOKEN
  renewAccessToken: (req, res) => {
    let refresh_token = req.body.refresh_token;
    if (!refresh_token) {
      throw new Error(constantVariables.MESSAGE.JWT_TOKEN.NO_TOKEN);
    } else {
      jwt.verify(
        refresh_token,
        constantVariables.REFRESH_SECRET_KEY,
        (err, user) => {
          if (err || !refresh_tokens.includes(refresh_token)) {
            return res.status(StatusCodes.FORBIDDEN).json({
              message: constantVariables.MESSAGE.JWT_TOKEN.INVALID_TOKEN,
            });
          }
          const access_token = jwt.sign(
            { username: user.username },
            constantVariables.ACCESS_SECRET_KEY,
            { expiresIn: "10m" }
          );
          return res
            .status(StatusCodes.CREATED)
            .json({ email: user.email, accessToken: access_token });
        }
      );
    }
  },
};

module.exports = AuthController;
