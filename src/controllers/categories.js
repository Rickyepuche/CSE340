import { getAllCategories } from '../models/categories.js';
import { getCategory } from '../models/categories.js';
import { getProjectsByCategory, updateCategoryAssignments, } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

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

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProject(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

export { categoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm };