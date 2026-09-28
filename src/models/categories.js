import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name FROM categories ORDER BY category_name ASC;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategory = async (categoryId) => {
    const query = `
        SELECT category_id, category_name 
        FROM categories 
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0] || null;
}

const getCategoriesByProject = async (projectId) => {
    const query =`
        SELECT c.category_id, c.category_name 
        FROM categories c
        JOIN project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getProjectsByCategory = async (categoryId) => {
    const query =`
        SELECT p.project_id, p.title, p.description
        FROM projects p
        JOIN project_categories pc ON p.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}

export { getAllCategories, getCategory, getCategoriesByProject, getProjectsByCategory, updateCategoryAssignments, assignCategoryToProject };







