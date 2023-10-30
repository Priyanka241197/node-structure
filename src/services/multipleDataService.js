const db = require("../config/dbConnection");
const tableOne = require("../models/tableOneModel");
const tableTwo = require("../models/tableTwoModel");

const MultipleDataService = {
  get: () => {
    return tableOne.findAll({
      include: [
        {
          model: tableTwo,
        },
      ],
    });
  },
  create: (tableOneDetails) => {
    return tableOne.create(tableOneDetails);
  },
  tableTwoCreate: (tableTwoDetails) => {
    return tableTwo.create(tableTwoDetails);
  },
  update: (updateRowData) => {
    return tableOne.update(updateRowData, { where: { id: updateRowData.id } });
  },
  updateTableTwo: (updateRowData) => {
    return tableTwo.update(updateRowData, { where: { id: updateRowData.id } });
  },
  delete: (id) => {
    return tableOne.destroy({ where: { id: id } });
  },
  deleteTwo: (tableOneId) => {
    return tableTwo.destroy({ where: { tableOneId: tableOneId } });
  },
  deleteOne: (tableOneId) => {
    return tableOne.destroy({ where: { id: tableOneId } });
  },
};
module.exports = MultipleDataService;
