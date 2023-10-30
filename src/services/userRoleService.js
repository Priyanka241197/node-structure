const userRole = require("../models/userRoleModel");

const UserRoleService = {
  create: (userRoleDetails) => {
    return userRole.create(userRoleDetails);
  },
  update: (userData, id) => {
    return userRole.update(userData, { where: { id: id } });
  },
  getAll: () => {
    return userRole.findAll({ where: { isActive: true } });
  },
  deleteUserRole: (roleId) => {
    return userRole.update({ isActive: false }, { where: { id: roleId } });
  },
};
module.exports = UserRoleService;
