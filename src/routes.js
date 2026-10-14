import express from 'express';

import { homePage } from './controllers/index.js';
import { categoriesPage, showCategoryDetails, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { errorsPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm } from './controllers/users.js';
import { showProjectDetailsPage, projectsPage, projectValidation, showNewProjectForm, processNewProjectForm, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { organizationsPage, processNewOrganizationForm, showOrganizationDetailsPage, showNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showAllUsers, addUserToProject, deleteUserFromProject } from './controllers/users.js';
//import { delimiter } from 'ejs';

const router = express.Router();

router.get('/', homePage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organizations', organizationsPage);

// Route for organization details page
router.get('/organization/:id', requireLogin, showOrganizationDetailsPage);

//route for project details page
router.get('/project/:id', showProjectDetailsPage);

//route for category details page
router.get('/category/:id', showCategoryDetails)

// error-handling routes
router.get('/test-error', errorsPage);

// Route for new organization page
router.get('/new-organization', requireLogin, requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireLogin, requireRole('admin'), organizationValidation, processNewOrganizationForm);

//route to display the edit organization form
router.get('/edit-organization/:id', requireLogin, requireRole('admin'), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireLogin, requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project',requireLogin, requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireLogin, requireRole('admin'), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireLogin, requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireLogin, requireRole('admin'), processAssignCategoriesForm);

//Route to display edit project form
router.get('/edit-project/:id', requireLogin, requireRole('admin'), showEditProjectForm);

//Route to handle the edit project form submission
router.post('/edit-project/:id', requireLogin, requireRole('admin'), processEditProjectForm);

//route to handle the delete project and join project form submission
router.post('/join-project/:id', requireLogin, addUserToProject)
router.post('/leave-project/:id', requireLogin, deleteUserFromProject)

//Route to display the new category form page
router.get('/new-category', requireLogin, requireRole('admin'), showNewCategoryForm);

//Route to handle new category form submission
router.post('/new-category', requireLogin, requireRole('admin'), categoryValidation, processNewCategoryForm);

//Route to display edit category form
router.get('/edit-category/:id', requireLogin, requireRole('admin'), showEditCategoryForm);

//Route to handle the edit category form submission
router.post('/edit-category/:id', requireLogin, requireRole('admin'), categoryValidation, processEditCategoryForm)

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

//Protected users list 
router.get('/users', requireLogin, requireRole('admin'), showAllUsers);



export default router;