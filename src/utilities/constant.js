let constantVariables = {
  PORT: 4000,
  LISTENING_TO_PORT: "Listening to the port",
  ACCESS_SECRET_KEY: "FUIQ4mUzzOlepprVECFVDXWr8Rv6VdEE",
  REFRESH_SECRET_KEY: "2162F471BF3B77A5D1AF7444AFEC4",
  BASE_URI: "api",
  PAGINATION: {
    PAGE: 1,
    SIZE: 10,
  },
  MESSAGE: {
    USER: {
      NOT_REGISTERED: "User not registered with the given UserName.",
      LOGIN_SUCCESS: "User loggedin successfully.",
      LOGIN_FAILED: "Incorrect credentials!",
      CREATED: "New user created. Please login to continue..",
      USER_STATUS_INPUTS: "Please insert all inputs!",
      USER_STATUS_VALUE: "User activation set to:",
    },
    USERROLE: {
      CREATED: "New Role Created..",
      UPDATED: "Role Updated..",
      DELETE: "Role Deleted..",
    },
    JWT_TOKEN: {
      INVALID_TOKEN: "Ivalid token!",
      NO_TOKEN: "Token not avaialable in request",
    },
  },
};
module.exports = constantVariables;
