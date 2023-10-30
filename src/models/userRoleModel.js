const db = require("../config/dbConnection");
const { Sequelize } = require("sequelize");

const UserRole = db.define("userRole", {
  roleName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rolePrefix: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = UserRole;
