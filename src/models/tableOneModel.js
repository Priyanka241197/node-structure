const db = require("../config/dbConnection");
const { Sequelize } = require("sequelize");
const TableTwo = require("./tableTwoModel");

const TableOne = db.define("tableOne", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

TableOne.hasOne(TableTwo);

module.exports = TableOne;
