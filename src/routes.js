import express from 'express';

import { homePage } from './controllers/index.js';
import { categoriesPage, showCategoryDetails } from './controllers/categories.js';
import { errorsPage } from './controllers/errors.js';
import { showProjectDetailsPage, projectsPage } from './controllers/projects.js';
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


export default router;