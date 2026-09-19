import { getAllCategories } from '../models/categories.js';
import { getCategory } from '../models/categories.js';
import { getProjectsByCategory } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Project Categories';

    res.render('categories', { title, categories }); 
}

const showCategoryDetails = async (req, res) => {
    const categoryId = Number(req.params.id)
    const categoryData = await getCategory(categoryId);
    const categoryProjects = await getProjectsByCategory(categoryId);
    const title = "Category Details";

    res.render('category', { categoryData, categoryProjects, title });
}

export { categoriesPage, showCategoryDetails };