import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5; //Adjust this number as needed

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS); 
    const title = ' Upcoming Service Projects';

    res.render('projects', { title, projects });   
}

const showProjectDetailsPage = async (req, res) => {
    const projectId = Number(req.params.id)
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('projects', { title, projectDetails});
}

export { projectsPage, showProjectDetailsPage };