-- Queries use a colon : character to denote the variables that will receive data from the server


-- ** PROJECTS PAGE ** --

-- get all projects and their details for 'Browse Projects' form
SELECT * FROM Projects ORDER BY project_id;

-- create a new project for 'Add Project' form
INSERT INTO Projects(title, description, start_date, end_date, is_active, is_collaborative) VALUES
(:title_input, :description_input, :start_date_input, :end_date_input, :is_active_input, is_collaborative_input);

-- delete a project for 'Delete Project' form
DELETE FROM Projects WHERE project_id = :project_id_selected_from_browse_projects_page;


-- ** STUDENTS PAGE ** --

-- get all students and their details for 'Browse Students' form
SELECT CONCAT(f_name, ' ', l_name) AS name, email, phone FROM Students ORDER BY student_id;

-- add a new student for 'Add Student' form
INSERT INTO Students(f_name, l_name, email, phone) VALUES
(:f_name_input, l_name_input, email_input, phone_input);


-- ** ASSIGNMENTS PAGE ** --

-- get all assignments (which students correspond to which projects) for 'Browse Student Assignments' form
SELECT assignment_id, Projects.title, CONCAT(Students.f_name, ' ', Students.l_name) AS name 
FROM Assignments 
INNER JOIN Projects ON Assignments.project_id = Projects.project_id
INNER JOIN Students ON Assignments.student_id = Students.student_id
ORDER BY assignment_id;

-- associate a project with a student for 'Add Student to Project' form (M-to-M relationship addition) 
INSERT INTO Assignments(project_id, student_id) VALUES
(:project_id_input, :student_id_input);

-- get a single assignment's data for the 'Edit Assignment' form (M-to-M relationship update)
SELECT assignment_id, project_id, student_id FROM Assignments WHERE assignment_id = :assignment_id_selected_from_browse_assignments_page;

-- update an assignment based on submission of the 'Edit Assignment' form (M-to-M relationship update)
UPDATE Assignments SET project_id = :project_id_input, student_id = :student_id_input WHERE assignment_id = :assignment_id_from_update_form;

-- dis-associate a project from a student for 'Delete Assignment' form (M-to-M relationship deletion)
DELETE FROM Assignments WHERE assignment_id = :assignment_id_from_delete_form;


-- ** ROLES PAGE ** --

-- get all Roles and their details for 'Browse Roles' form
SELECT title FROM Roles ORDER BY role_id;

-- add a new Role for 'Add Role' form
INSERT INTO Roles(title) VALUES
(:title_input);

-- get all Roles associated w/a Assignment for 'Assignments_has_Roles' search functionality
SELECT role_id
FROM Assignments_has_Roless
WHERE assignment_id = <>;
-- ** TASKS PAGE ** --

-- get all tasks associated w/a Project and Student for 'Browse Tasks' search functionality
SELECT task_id, Projects.title AS project_title, CONCAT(Students.f_name, ' ', Students.l_name) AS name, Tasks.title AS task_title, Tasks.description, due_date, is_complete, has_citations
FROM Tasks
INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id
INNER JOIN Projects ON Assignments.project_id = Projects.project_id
INNER JOIN Students ON Assignments.student_id = Students.student_id
WHERE Projects.title = :project_title_input AND f_name = :f_name_input AND l_name = :l_name_input
ORDER BY task_id;

-- add a new task for 'Add Task' form
INSERT INTO Tasks(title, description, due_date, is_complete, has_citations, assignment_id) VALUES
(:title_input, :description_input, :due_date_input, :is_complete_input, :has_citations_input, :assignment_id_input);


-- ** CITATIONS PAGE ** --
-- get all Citations and their details for 'Browse Citations' form
SELECT title,source,author,url FROM Citations ORDER BY citation_id;

-- add a new Citation for 'Add Citation' form
INSERT INTO Citations(title,source,author,url) VALUES
(:title_input, source_input,author_input,url_input);

-- get all Citations associated w/a Task for 'Tasks_has_Citations' search functionality
SELECT citation_id
FROM Tasks_has_Citations
WHERE task_id = <>;
