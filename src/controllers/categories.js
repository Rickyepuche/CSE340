import { getAllCategories, getCategory, getProjectsByCategory, getCategoriesByProject, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Define validation and sanitization rules for organization form
// Define validation rules for organization form
const categoryValidation = [
    body('categoryName')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Category name must be between 3 and 150 characters')
];


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

const showNewCategoryForm = async (req, res) => {
    const title = "New Category";

    res.render('new-category', {title});
}

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Loop through validation errors and flash them
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });
    
            // Redirect back to the new project form
            return res.redirect('/new-category');
        }

    //extract data from the form
    const {categoryName} = req.body;

    try {  //create the data in the database
        const categoryId = await createCategory(categoryName);

        req.flash('success', 'category created successfully');
        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error', 'There was an error creating the new category.');
        res.redirect('/new-category');
    }
}

const showEditCategoryForm = async (req, res) => {
    const title = "Update The Category Details";
    const categoryId = req.params.id;
    const categoryData = await getCategory(categoryId);

    res.render('edit-category', {title, categoryData});
}

const processEditCategoryForm = async (req, res) => {
    // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Loop through validation errors and flash them
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });
    
            // Redirect back to the new project form
            return res.redirect('/edit-category/'+ req.params.id);
        }

    const categoryId = req.params.id;

    const {categoryName} = req.body;
    await updateCategory(categoryName, categoryId);

    req.flash('success', 'Category updated successfully!');

    res.redirect(`/category/${categoryId}`);
}

export { categoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation };