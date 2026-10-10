import bcrypt from 'bcrypt';
import db from './db.js';

const createUser = async (name, email, passwordHash) => {
    const default_role = 'user';
    const query = `
        INSERT INTO users (name, email, password_hash, role_id) 
        VALUES ($1, $2, $3, (SELECT role_id FROM roles WHERE role_name = $4)) 
        RETURNING user_id
    `;
    const queryParams = [name, email, passwordHash, default_role];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create user');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new user with ID:', result.rows[0].user_id);
    }

    return result.rows[0].user_id;
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT u.user_id, u.name, u.email, u.password_hash, r.role_name 
        FROM users u
        JOIN roles r ON u.role_id = r.role_id
        WHERE u.email = $1 
    `;
    const queryParams = [email];
    
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null; // User not found
    }
    
    return result.rows[0];
};

const verifyPassword = async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
};

const authenticateUser = async (email, password) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.password_hash);

    if (!isPasswordValid) {
        return null; // Invalid password
    }

    return user;
};

const getAllUsers = async () => {
    const query =`
        SELECT 
            u.user_id,
            u.name,
            u.email,
            r.role_name
        FROM users u
        JOIN roles r ON u.role_id = r.role_id;
    `;
    const result = await db.query(query);

    return result.rows;
};

const assignUserToProject = async (userId, projectId) => {
    const query = `
        INSERT INTO users_projects (user_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [userId, projectId]);
}

const removeUserFromProject = async (userId, projectId) => {
    const deleteQuery = `
        DELETE FROM users_projects
        WHERE user_id = $1 AND project_id = $2;
    `;
    await db.query(deleteQuery, [userId, projectId]);
    
}

const getProjectsOfUser = async (userId) => {
    const query =`
        SELECT p.project_id, p.title, p.description, p.project_date, p.location
        FROM projects p
        JOIN users_projects up ON p.project_id = up.project_id
        WHERE up.user_id = $1;
    `
    const queryParams = [userId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

export { createUser, authenticateUser, getAllUsers, assignUserToProject, removeUserFromProject, getProjectsOfUser };