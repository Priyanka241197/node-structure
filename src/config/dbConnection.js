const { Sequelize } = require('sequelize');
const db = new Sequelize('nodeStructure', 'postgres', '123456', {
  //databasename,username,password this all needs to be added in the config file
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
