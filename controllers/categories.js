const { CategoryService } = require("../services");

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getCategories();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCategories };
