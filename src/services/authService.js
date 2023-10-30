const user = require("../models/userModel");

const UserService = {
  isEmailExists: (email) => {
    return user.findOne({
      where: { email: email },
    });
  },
};
module.exports = UserService;
