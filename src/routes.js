import express from 'express';

import { organizationsPage } from './controllers/organizations.js';
import { homePage } from './controllers/index.js';
import { categoriesPage } from './controllers/categories.js';
import { projectsPage } from './controllers/projects.js';
import { errorsPage } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectDetailsPage } from './controllers/projects.js';
const router = express.Router();

router.get('/', homePage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);
router.get('/organizations', organizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

//route for project details page
router.get('/project/:id', showProjectDetailsPage);

// error-handling routes
router.get('/test-error', errorsPage);

export default router;