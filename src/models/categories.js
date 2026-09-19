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

export { getAllCategories, getCategory, getCategoriesByProject, getProjectsByCategory };







