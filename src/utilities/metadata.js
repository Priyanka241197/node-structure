const constant = require("./constant");

function responseDataFormat(
  name,
  page = constant.PAGINATION.PAGE,
  size = constant.PAGINATION.SIZE,
  result,
  data
) {
  const metadata = {
    name: name,
    currentPage: parseInt(page),
    pageSize: parseInt(size),
    totalPages: Math.ceil(result.count / size),
    totalCount: result.count,
    data: data,
  };

  return metadata;
}

module.exports = { responseDataFormat };
