const Category = require("../models/category");
const categories = require("./categories");

const runSeeders = async () => {
  const categoryExists = await Category.findOne();
  if (!categoryExists) {
    await Category.bulkCreate(categories);
  }
};

module.exports = { runSeeders };
