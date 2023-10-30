const db = require("../config/dbConnection");

const SpService = {
  getAll: () => {
    return db.query("Select * from get_film_count()");
  },
  getAllUser: () => {
    return db.query("Select * from GetAllUsers()");
  },
};
module.exports = SpService;
