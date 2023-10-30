const user = require("../models/userModel");
const { Op } = require("sequelize");
const { paginate } = require("../utilities/pagination");

const UserService = {
  create: (userdetails) => {
    return user.create(userdetails);
  },
  updateStatus: (isActive, id) => {
    user.update({ isActive: isActive }, { where: { id: id } });
  },
  getAll: (page, size, field, value) => {
    let paginationDetails = paginate(page, size);

    let where;
    if (field) {
      where = {
        [field]: {
          [Op.iLike]: `%${value}%`,
        },
      };
    }
    return user.findAndCountAll({
      limit: paginationDetails.limit,
      offset: paginationDetails.offset,
      where,
    });
  },

  getById: (id) => {
    return user.findOne({
      where: { id: id },
    });
  },

};
module.exports = UserService;
