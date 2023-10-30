const db = require("../config/dbConnection");
const { Sequelize, TableHints } = require("sequelize");
const TableOne = require("./tableOneModel");

const TableTwo = db.define("tableTwo", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

module.exports = TableTwo;
