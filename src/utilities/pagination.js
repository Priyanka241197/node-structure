const constant = require("./constant");

function paginate(
  page = constant.PAGINATION.PAGE,
  size = constant.PAGINATION.SIZE
) {
  let limit = parseInt(size);
  let offset = (page - 1) * size;
  let paginationDetails = { limit, offset };
  return paginationDetails; 
}

module.exports = { paginate };
