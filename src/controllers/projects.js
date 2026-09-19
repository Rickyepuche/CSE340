import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5; //Adjust this number as needed

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); 
    const title = ' Upcoming Service Projects';

    res.render('projects', { title, projects });   
}

const showProjectDetailsPage = async (req, res) => {
    const projectId = Number(req.params.id)
    const projectDetails = await getProjectDetails(projectId);
    const projectCategory = await getCategoriesByProject(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, projectCategory });
}

export { projectsPage, showProjectDetailsPage };