const Category = require("../models/category");

const getCategories = async () => {
  return await Category.findAll({
    order: [["name", "ASC"]],
    attributes: ["id", "name"],
  });
};

module.exports = { getCategories };
