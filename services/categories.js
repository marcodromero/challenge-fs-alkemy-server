const Category = require("../models/category");

class CategoriesService {
  getCategories = async () => {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
      attributes: ["id", "name"],
    });
    return categories;
  };
}
module.exports = CategoriesService;
