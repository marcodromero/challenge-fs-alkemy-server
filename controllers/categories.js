const { catchedAsync, response} = require("../helpers");
const {CategoriesService} = require("../services");
const categoriesService = new CategoriesService();

const getCategories = async (req, res) => {
    const categories = await categoriesService.getCategories();
    response(res, 200, categories);
};

module.exports = { getCategories: catchedAsync(getCategories) };
