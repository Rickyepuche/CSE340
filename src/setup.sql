-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    project_date DATE NOT NULL,
    CONSTRAINT fk_organization
        FOREIGN KEY (organization_id) 
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
);

-- Insert 5 sample projects for each of your 3 organizations (IDs 1, 2, and 3)
INSERT INTO projects (organization_id, title, description, location, project_date) VALUES
-- BrightFuture Builders (organization_id = 1)
(1, 'Community Center Bus Stop Shelter', 'Build a wooden rain shelter near the main bus stop.', '123 Main St', '2026-04-10'),
(1, 'Playground Bench Installation', 'Construct and install wooden benches around the park.', 'Oak Park', '2026-04-18'),
(1, 'Wheelchair Ramp Build', 'Construct an accessible ramp for the local clinic.', 'Health Center', '2026-05-02'),
(1, 'Library Reading Deck', 'Build an outdoor deck space for public reading.', 'Town Library', '2026-05-15'),
(1, 'Shed Construction', 'Build a storage shed for community tools.', 'Civic Park', '2026-05-28'),

-- GreenHarvest Growers (organization_id = 2)
(2, 'Spring Crop Planting', 'Plant seasonal vegetables in urban garden beds.', '5th Ave Garden', '2026-04-12'),
(2, 'Compost Bin Workshop', 'Build compost stations and educate neighbors.', 'Greenhouse Site', '2026-04-22'),
(2, 'Drip Irrigation Install', 'Set up water-saving irrigation systems.', 'North Plot', '2026-05-05'),
(2, 'Fruit Tree Planting', 'Plant 20 fruit trees in the community orchard.', 'Riverside Park', '2026-05-19'),
(2, 'Harvest & Distribution Day', 'Gather fresh produce and package for food pantries.', '5th Ave Garden', '2026-05-30'),

-- UnityServe Volunteers (organization_id = 3)
(3, 'Neighborhood Clean-Up', 'Collect litter and organize recycling bins.', 'Downtown Plaza', '2026-04-15'),
(3, 'Senior Home Care Kits', 'Assemble and deliver care packages to seniors.', 'Community Hall', '2026-04-25'),
(3, 'School Supply Packing', 'Pack backpacks with supplies for local students.', 'Unity Center', '2026-05-08'),
(3, 'Food Bank Sorting', 'Sort and label incoming canned food donations.', 'Central Warehouse', '2026-05-20'),
(3, 'Park Trail Repair', 'Clear weeds and restore walking paths.', 'Pine Forest Trail', '2026-05-29');

-- ========================================
-- Categories Table
-- ========================================
CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- ========================================
-- Junction Table: Projects <-> Categories
-- ========================================
CREATE TABLE IF NOT EXISTS project_categories (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES projects (project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories (category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Sample Data: Categories
-- ========================================
INSERT INTO categories (category_name) VALUES
('Construction & Infrastructure'),
('Environment & Gardening'),
('Community Outreach');

-- ========================================
-- Associate Projects with Categories
-- ========================================
-- BrightFuture Builders Projects (IDs 1-5) -> Construction & Infrastructure (category_id = 1)
-- GreenHarvest Growers Projects (IDs 6-10) -> Environment & Gardening (category_id = 2)
-- UnityServe Volunteers Projects (IDs 11-15) -> Community Outreach (category_id = 3)

INSERT INTO project_categories (project_id, category_id) VALUES
-- Projects 1-5 (Construction)
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),

-- Projects 6-10 (Environment)
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),

-- Projects 11-15 (Community Outreach)
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3),

-- Multi-category associations (showing many-to-many capabilities)
(7, 1),   -- Compost Bin Workshop involves construction
(15, 2);  -- Park Trail Repair involves environment

