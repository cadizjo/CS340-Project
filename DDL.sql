/*

  CS340 PROJECT PORTFOLIO - DATA DEFINITION SQL QUERIES

  PROJECT TITLE: Project Hive

  MEMBERS: Kyle Thom and Jonah Cadiz

  DESCRIPTION: 
  This SQL file contains the definitions for each table in the Database Outline, 
  along with their relationships, attributes, and sample data.

*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Projects table
CREATE OR REPLACE TABLE Projects (
  project_id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL UNIQUE,
  description varchar(500),
  start_date date,
  end_date date,
  is_active bool DEFAULT 1,
  is_collaborative bool DEFAULT 0,
  PRIMARY KEY (project_id)
);

-- Students table
CREATE OR REPLACE TABLE Students (
  student_id int(11) NOT NULL AUTO_INCREMENT,
  f_name varchar(50) NOT NULL,
  l_name varchar(50) NOT NULL,
  email varchar(50) NOT NULL UNIQUE,
  phone bigint(11),
  PRIMARY KEY (student_id)
);

-- Assignments table
CREATE OR REPLACE TABLE Assignments (
  assignment_id int(11) NOT NULL AUTO_INCREMENT,
  student_id int(11) NOT NULL,
  project_id int(11),
  PRIMARY KEY (assignment_id),
  FOREIGN KEY (student_id) REFERENCES Students (student_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Projects (project_id) ON DELETE SET NULL
);

-- Roles table
CREATE OR REPLACE TABLE Roles (
  role_id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL UNIQUE,
  PRIMARY KEY (role_id)
);

-- Tasks table
CREATE OR REPLACE TABLE Tasks (
  task_id int(11) NOT NULL AUTO_INCREMENT,
  assignment_id int(11) NOT NULL,
  title varchar(50) NOT NULL,
  description varchar(500),
  due_date date,
  is_complete bool DEFAULT 0,
  has_citations bool DEFAULT 0,
  PRIMARY KEY (task_id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id) ON DELETE CASCADE
);

-- Citations table
CREATE OR REPLACE TABLE Citations (
  citation_id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(50) NOT NULL,
  source varchar(50) NOT NULL,
  author varchar(50) NOT NULL, 
  url varchar(150),
  PRIMARY KEY (citation_id)
);

-- Projects_has_Roles_has_Students table
CREATE OR REPLACE TABLE Assignments_has_Roles (
  assignment_id int(11) NOT NULL,
  role_id int(11) NOT NULL,
  FOREIGN KEY (assignment_id) REFERENCES Assignments (assignment_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES Roles (role_id) ON DELETE CASCADE,
  PRIMARY KEY (assignment_id, role_id)
);

-- Tasks_has_Citations intersection table
CREATE OR REPLACE TABLE Tasks_has_Citations (
  task_id int(11) NOT NULL,
  citation_id int(11) NOT NULL,
  FOREIGN KEY (task_id) REFERENCES Tasks (task_id) ON DELETE CASCADE,
  FOREIGN KEY (citation_id) REFERENCES Citations (citation_id) ON DELETE CASCADE,
  PRIMARY KEY (task_id, citation_id)
);

-- Insert example data to Projects
INSERT INTO Projects (title, description, start_date, end_date, is_active, is_collaborative)
VALUES 
('Biology Group Final', 'Final group research project for biology that will be presented at the end of the school year.', '2023-04-05', NULL, 1, 1),
('Spring Science Fair Project', 'Conduct research on plants and create board before May to showcase at the Spring Science Fair.', '2023-01-01', NULL, 1, 0),
('Arts and Crafts Project', 'Personal art project that will be worked on during the summer for an art showcase.', NULL, NULL, 0, 0);

-- Insert example data to Students
INSERT INTO Students (f_name, l_name, email, phone)
VALUES
('Eric', 'Saylor', 'saylore@gmail.com', '8084829621'),
('Lillian', 'Waldo', 'waldol@gmail.com', NULL),
('George', 'Inigo', 'inigog@gmail.com', NULL),
('Dana', 'Holt', 'holtd@gmail.com', '5302208740');

-- Insert example data to Assignments
INSERT INTO Assignments (student_id, project_id)
VALUES
(1, 1),
(4, 1),
(2, 2),
(4, 3);

-- Insert example data to Roles
INSERT INTO Roles (title)
VALUES 
('Team Leader'),
('Note-taker'),
('Researcher'),
('Resource Manager');

-- Insert example data to Assignments_has_Roles
INSERT INTO Assignments_has_Roles (assignment_id, role_id)
VALUES
(1, 1),
(1, 3),
(2, 3),
(2, 4);

-- Insert example data to Tasks
INSERT INTO Tasks (assignment_id, title, description, due_date, is_complete, has_citations)
VALUES 
(1, 'Design a biology experiment.', 'Perform background research and find data to begin making an experiment.', '2023-04-10', 0, 1),
(2, 'Gather materials for the experiment.', 'Note: Consult the teacher for any assistance.', '2023-04-12', 0, 0),
(3, 'Create experimental procedures for plant project.', 'Develop a set of guidelines that will be used to study plants. Refer to samples online for assistance.', '2023-02-02', 0, 1);

-- Insert example data to Citations
INSERT INTO Citations (title, source, author, url)
VALUES
('Experimental Procedure', 'Website', 'Science Buddies', 'https://www.sciencebuddies.org/science-fair-projects/science-fair/writing-experimental-procedures'),
('Plant Physiology', 'Textbook', 'Lincoln Taiz', NULL),
('How to do a Science Fair Project', 'Website', 'NASA', 'https://www.jpl.nasa.gov/edu/learn/activities/science-fair-project/');

-- Inser example data to Tasks_has_Citations
INSERT INTO Tasks_has_Citations (task_id, citation_id)
VALUES 
(1, 1), 
(3, 1), 
(3, 2), 
(3, 3);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;