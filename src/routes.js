import express from 'express';

import { homePage } from './controllers/index.js';
import { categoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { errorsPage } from './controllers/errors.js';
import { showProjectDetailsPage, projectsPage, projectValidation, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { organizationsPage, processNewOrganizationForm, showOrganizationDetailsPage, showNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';


const router = express.Router();

router.get('/', homePage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organizations', organizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

//route for project details page
router.get('/project/:id', showProjectDetailsPage);

//route for category details page
router.get('/category/:id', showCategoryDetails)

// error-handling routes
router.get('/test-error', errorsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

//route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project',  showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

//Route to display edit project form
router.get('/edit-project/:id', showEditProjectForm);

//Route to handle the edit project form submission
router.post('/edit-project/:id', processEditProjectForm);

//Route to display the new category form page
router.get('/new-category', showNewCategoryForm);

//Route to handle new category form submission
router.post('/new-category', categoryValidation, processNewCategoryForm);

//Route to display edit category form
router.get('/edit-category/:id', showEditCategoryForm);

//Route to handle the edit category form submission
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm)

export default router;