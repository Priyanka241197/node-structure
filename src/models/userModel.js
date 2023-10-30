const db = require("../config/dbConnection");
const { Sequelize } = require("sequelize");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  phoneNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
