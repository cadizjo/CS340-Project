/*
    SETUP
*/
var express = require('express');               // use express library for web server
var app = express();                            // instantiate an express object to interact with the server in our code
PORT = 4263;                                    // receives incoming requests on specified PORT
var db = require('./database/db-connector')     // database to process queries


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static("public/"))              // all files in public directory are treated as static files
app.use(express.json())                         // to read/handle/parse JSON objects
app.use(express.urlencoded({extended: true}))
                

/*
    ROUTES
*/

/*
    PROCESS SELECT/READ QUERIES
*/
app.get('/', function(req, res) {
    res.status(200).render('index'); // home page   
});              

app.get('/projects', function(req, res) {
    // query all project data for page display
    var query = "SELECT * FROM Projects ORDER BY project_id;"
    db.pool.query(query, function(error, rows, fields) {
        res.status(200).render('projects', {data: rows});
    })
});

app.get('/students', function(req, res) {
    // query all student data for page display
    var query = "SELECT student_id, CONCAT(f_name, ' ', l_name) AS name, email, phone FROM Students ORDER BY student_id;"
    db.pool.query(query, function(error, rows, fields) {
        res.status(200).render('students', {data: rows});
    })
});

app.get('/assignments', function(req, res) {
    // query all assignment data for page display
    var query1 = 
    "SELECT assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Students.email AS student_email, Projects.title AS project_title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    // query all project data for dropdown selection
    var query2 = "SELECT project_id, title FROM Projects ORDER BY project_id;"
    var obj = {}

    db.pool.query(query1, function(error, rows, fields) {
        obj.data = rows
        db.pool.query(query2, function(error, rows, fields) {
            obj.dropdown = rows
            res.status(200).render('assignments', obj);
        })
    })
});

app.get('/roles', function(req, res) {
    // query all role data for page display
    var query1 = "SELECT * FROM Roles ORDER BY role_id;"
    // query all assignment-role data for page display
    var query2 = 
    "SELECT Assignments.assignment_id AS assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Students.email AS student_email, Projects.title AS project_title, Roles.title AS role_title " +
    "FROM Roles " +
    "INNER JOIN Assignments_has_Roles ON Roles.role_id = Assignments_has_Roles.role_id " +
    "INNER JOIN Assignments ON Assignments_has_Roles.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    // query all assignment data for dropdown selection
    var query3 = 
    "SELECT Assignments.assignment_id, Students.email, Projects.title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    // query all role data for dropdown selection
    var query4 = "SELECT role_id, title FROM Roles ORDER BY role_id;"
    var obj = {}

    db.pool.query(query1, function(error, rows, fields) {
        obj.roles = rows
        db.pool.query(query2, function(error, rows, fields) {
            obj.assignedRoles = rows
            db.pool.query(query3, function(error, rows, fields) {
                obj.assignmentDropdown = rows
                db.pool.query(query4, function(error, rows, fields) {
                    obj.roleDropdown = rows
                    res.status(200).render('roles', obj);
                })
            })
        })
    })
});

app.get('/tasks', function(req, res) {
    // query all task data for page display
    var query1 = 
    "SELECT Tasks.task_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Students.email AS student_email, Projects.title AS project_title, Tasks.title AS task_title, Tasks.description, due_date, is_complete, has_citations " +
    "FROM Tasks " +
    "INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY task_id;"
    // query all assignment data for dropdown selection
    var query2 = 
    "SELECT Assignments.assignment_id, Students.email, Projects.title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    var obj = {}

    db.pool.query(query1, function(error, rows, fields) {
        obj.data = rows
        db.pool.query(query2, function(error, rows, fields) {
            obj.dropdown = rows
            res.status(200).render('tasks', obj);
        })
    })
});

app.get('/citations', function(req, res) {
    // query all citation data for page display
    var query1 = "SELECT * FROM Citations ORDER BY citation_id;"
    // query all task-citation data for page display
    var query2 = 
    "SELECT Tasks.task_id AS task_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Students.email AS student_email, Projects.title AS project_title, Tasks.title AS task_title, Citations.citation_id AS citation_id " +
    "FROM Citations " +
    "INNER JOIN Tasks_has_Citations ON Citations.citation_id = Tasks_has_Citations.citation_id " +
    "INNER JOIN Tasks ON Tasks_has_Citations.task_id = Tasks.task_id " +
    "INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY task_id;"
    // query all task data for dropdown selection
    var query3 =
    "SELECT Tasks.task_id AS task_id, Students.email, Projects.title AS project_title, Tasks.title AS task_title " +
    "FROM Tasks " +
    "INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY task_id;"
    // query all citation data for dropdown selection
    var query4 = "SELECT citation_id, title, author FROM Citations ORDER BY citation_id;"
    var obj = {}

    db.pool.query(query1, function(error, rows, fields) {
        obj.citations = rows
        db.pool.query(query2, function(error, rows, fields) {
            obj.taskCitations = rows
            db.pool.query(query3, function(error, rows, fields) {
                obj.taskDropdown = rows
                db.pool.query(query4, function(error, rows, fields) {
                    obj.citationDropdown = rows
                    res.status(200).render('citations', obj);
                })
            })
        })
    })
});


/*
    PROCESS CREATE/INSERT QUERIES 
*/
app.post('/addProject', function(req, res) {
    // get user input as req body
    var data = req.body
    if (data.desc == '') data.desc = 'NULL'
    if (data.isActive == true) data.isActive = 1
    else if (data.isActive == false) data.isActive = 0
    if (data.isCollab == true) data.isCollab = 1
    else if (data.isCollab == false) data.isCollab = 0
    
    var query1 = `SELECT * FROM Projects WHERE title = '${data.title}';`
    var query2 = `INSERT INTO Projects(title, description, is_active, is_collaborative) VALUES ` +
    `('${data.title}', '${data.desc}', ${data.isActive}, ${data.isCollab});`

    db.pool.query(query1, function(error, rows, fields) {
        // check if project w same title alredy exists in Projects table before inserting new record (since each title must be unique)
        if (rows.length > 0) {
            console.log("project title alredy exists")
            res.sendStatus(409)
        }
        else {
            // insert all fields except start and end dates (this will make both dates null by default)
            // if user enters a start or end date, update newly inserted record with input (this is to fix null date INSERT issue)
            db.pool.query(query2, function(error, rows, fields) {
                if (data.startDate != '') {
                    db.pool.query(`UPDATE Projects SET start_date = '${data.startDate}' WHERE title = '${data.title}'`, function(error, rows, fields) {})
                }
                if (data.endDate != '') {
                    db.pool.query(`UPDATE Projects SET end_date = '${data.endDate}' WHERE title = '${data.title}'`, function(error, rows, fields) {})
                }
                res.sendStatus(200)
            })        
        } 
    })
})

app.post('/addStudent', function(req, res) {
    var data = req.body
    if (data.phone == '') data.phone = 'NULL'
    
    var query1 = `SELECT * FROM Students WHERE email = '${data.email}';`
    var query2 = `INSERT INTO Students(f_name, l_name, email, phone) VALUES` +
    `('${data.fname}', '${data.lname}', '${data.email}', '${data.phone}');`

    db.pool.query(query1, function(error, rows, fields) {
        // check if student w same email alredy exists in Students table before inserting new record (since each email must be unique)
        if (rows.length > 0) {
            console.log("student email alredy exists")
            res.sendStatus(409)
        }
        else {
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                }
                else {
                    res.sendStatus(200)
                }
            })        
        } 
    })
})

app.post('/addAssignment', function(req, res) {
    var data = req.body
    if (data.project == 0) 
        data.project = 'NULL'

    var query1 = `SELECT * FROM Students WHERE email = '${data.email}'`
    var query2 = `SELECT assignment_id FROM Assignments ` +
    `WHERE student_id = (SELECT student_id FROM Students WHERE email = '${data.email}') && project_id = ${data.project};`
    var query3 = `INSERT INTO Assignments(student_id, project_id) VALUES ` + 
    `((SELECT student_id FROM Students WHERE email = '${data.email}'), ${data.project});`

    db.pool.query(query1, function(error, rows, fields) {
        // check if email exists in Students table before inserting new record
        if (rows.length == 0) {
            console.log("email does not exist")
            res.sendStatus(409)
        }
        else {
            // check if assignment already exists in Assignments table before inserting new record
            db.pool.query(query2, function(error, rows, fields) {
                console.log(rows)
                if (rows.length > 0) {
                    console.log("assignment already exists")
                    res.sendStatus(410)
                } 
                else {
                    db.pool.query(query3, function(error, rows, fields) {
                        if (error) {
                            console.log(error)
                            res.sendStatus(400)
                        }
                        else {
                            res.sendStatus(200)
                        }
                    })        
                }
            })
        }
    })
})

app.post('/addRole', function(req, res) {
    var data = req.body
    
    var query1 = `SELECT * FROM Roles WHERE title = '${data.role}';`
    var query2 = `INSERT INTO Roles(title) VALUES ('${data.role}');`

    db.pool.query(query1, function(error, rows, fields) {
        // check if role w same title alredy exists in Roles table before inserting new record (since each role title must be unique)
        if (rows.length > 0) {
            console.log("role title alredy exists")
            res.sendStatus(409)
        }
        else {
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                }
                else {
                    res.sendStatus(200)
                }
            })        
        } 
    })
})

app.post('/addAssignedRole', function(req, res) {
    var data = req.body
    
    var query1 = `SELECT * FROM Assignments_has_Roles WHERE assignment_id = ${data.assignment} && role_id = ${data.role};`
    var query2 = `INSERT INTO Assignments_has_Roles(assignment_id, role_id) VALUES (${data.assignment}, ${data.role});`

    db.pool.query(query1, function(error, rows, fields) {
        // check if assigned role alredy exists in Assignments_has_Roles table before inserting new record
        if (rows.length > 0) {
            console.log("assigned role alredy exists")
            res.sendStatus(410)
        }
        else {
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                }
                else {
                    res.sendStatus(200)
                }
            })        
        } 
    })
})

app.post('/addTask', function(req, res) {
    var data = req.body
    if (data.desc == '') data.desc = 'NULL'
    if (data.isComplete == true) data.isComplete = 1
    else if (data.isComplete == false) data.isComplete = 0
    if (data.hasCitations == true) data.hasCitations = 1
    else if (data.hasCitations == false) data.hasCitations = 0
    
    var query1 = `SELECT * FROM Tasks WHERE assignment_id = ${data.assignment} && title = '${data.title}';`
    var query2 = `INSERT INTO Tasks(assignment_id, title, description, is_complete, has_citations) VALUES ` + 
    `(${data.assignment}, '${data.title}', '${data.desc}', ${data.isComplete}, ${data.hasCitations});`

    db.pool.query(query1, function(error, rows, fields) {
        // check if task w same assignment and title alredy exists in Tasks table before inserting new record (since each assignment+title must be unique)
        if (rows.length > 0) {
            console.log("task w same assignment and title already exists")
            res.sendStatus(409)
        }
        else {
            // insert all fields except due date (this will make it null by default)
            // if user enters a due date, update newly inserted record with input (this is to fix null date INSERT issue)
            db.pool.query(query2, function(error, rows, fields) {
                if (data.dueDate != '') {
                    db.pool.query(`UPDATE Tasks SET due_date = '${data.dueDate}' WHERE assignment_id = ${data.assignment} && title = '${data.title}'`, function(error, rows, fields) {
                        if (error)
                            console.log(error)
                    })
                }
                res.sendStatus(200)
            })         
        } 
    })
})

app.post('/addCitation', function(req, res) {
    var data = req.body
    
    var query1 = `SELECT * FROM Citations WHERE title = '${data.title}' && author = '${data.author}';`
    var query2 = `INSERT INTO Citations(title, source, author, url) VALUES ` +
    `('${data.title}', '${data.source}', '${data.author}', '${data.url}');`

    db.pool.query(query1, function(error, rows, fields) {
        // check if citation w same title and author alredy exists in Citations table before inserting new record (since each title and author must be unique)
        console.log(rows)
        if (rows.length > 0) {
            console.log("citation w same title and author alredy exists")
            res.sendStatus(410)
        }
        else {
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                }
                else {
                    res.sendStatus(200)
                }
            })        
        } 
    })
})

app.post('/addTaskCitation', function(req, res) {
    var data = req.body
    
    var query1 = `SELECT * FROM Tasks_has_Citations WHERE task_id = ${data.task} && citation_id = ${data.citation};`
    var query2 = `INSERT INTO Tasks_has_Citations(task_id, citation_id) VALUES (${data.task}, ${data.citation});`

    db.pool.query(query1, function(error, rows, fields) {
        // check if task is alredy associated w citation in Tasks_has_Citations table before inserting new record
        if (rows.length > 0) {
            console.log("task citation alredy exists")
            res.sendStatus(410)
        }
        else {
            db.pool.query(query2, function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                }
                else {
                    res.sendStatus(200)
                }
            })        
        } 
    })
})


/*
    PROCESS EDIT/UPDATE QUERIES
*/
app.post("/updateAssignment", function (req, res) {
    console.log("\nUpdate Assignment ID: ", req.body.id)
    var data = req.body
    if (data.project == 0) 
        data.project = 'NULL'

    var query1 = `SELECT * FROM Students WHERE email = '${data.email}'`
    var query2 = `SELECT assignment_id FROM Assignments ` +
    `WHERE student_id = (SELECT student_id FROM Students WHERE email = '${data.email}') && project_id = ${data.project};`
    var query3 = `UPDATE Assignments SET student_id = (SELECT student_id FROM Students WHERE email = '${data.email}'), project_id = ${data.project} WHERE assignment_id = ${data.id};`

    db.pool.query(query1, function(error, rows, fields) {
        // check if email exists in Students table before updating selected record
        if (rows.length == 0) {
            console.log("email does not exist")
            res.sendStatus(409)
        }
        else {
            // check if assignment already exists in Assignments table before updating selected record
            db.pool.query(query2, function(error, rows, fields) {
                if (rows.length > 0) {
                    console.log("assignment already exists")
                    res.sendStatus(410) 
                }
                else {
                    db.pool.query(query3, function(error, rows, fields) {
                        if (error) {
                            console.log(error)
                            res.sendStatus(400)
                        }
                        else {
                            res.sendStatus(200)
                        }
                    })        
                }
            })
        }
    })
});

// gets data about a specific assignment record for editing
app.post('/assignmentData', function(req, res) {
    var id = req.body.id
    var query = `SELECT Students.email, Projects.project_id ` +
    `FROM Assignments ` +
    `INNER JOIN Students ON Assignments.student_id = Students.student_id ` +
    `LEFT JOIN Projects ON Assignments.project_id = Projects.project_id ` +
    `WHERE assignment_id = ${id};`

    db.pool.query(query, function(error, rows, fields) {
        console.log(rows)
        res.send(rows)
    })
})


/*
    PROCESS DELETE QUERIES
*/
app.post("/deleteAssignment", function (req, res) {
    console.log("\nDelete Assignment ID: ", req.body.id)
    var data = req.body
    var query = `DELETE FROM Assignments WHERE assignment_id = ${data.id};`
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(error)
        }
        else {
            res.sendStatus(200)
        }
    })
});

// gets data about a single assignment record for deletion
app.post('/singleAssignmentData', function(req, res) {
    var id = req.body.id
    var query = 
    `SELECT CONCAT(Students.f_name, ' ', Students.l_name) AS name, Students.email, Projects.title ` +
    `FROM Assignments ` +
    `INNER JOIN Students ON Assignments.student_id = Students.student_id ` +
    `LEFT JOIN Projects ON Assignments.project_id = Projects.project_id ` +
    `WHERE assignment_id = ${id};`

    db.pool.query(query, function(error, rows, fields) {
        console.log(rows)
        res.send(rows)
    })
})

app.post("/deleteProject", function (req, res) {
    console.log("\nDelete Project ID: ", req.body.id)
    var data = req.body
    var query = `DELETE FROM Projects WHERE project_id = ${data.id};`
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error)
            res.sendStatus(error)
        }
        else {
            res.sendStatus(200)
        }
    })
});

// gets data about a single project record for deletion
app.post('/singleProjectData', function(req, res) {
    var id = req.body.id
    var query = `SELECT Projects.title FROM Projects WHERE project_id = ${id};`

    db.pool.query(query, function(error, rows, fields) {
        console.log(rows)
        res.send(rows)
    })
})


app.get("*", function (req, res) {
    console.log("\n  -- 404!");
    res.status(404).send('Error 404 - Page not found');
});

/*
    LISTENER
*/
app.listen(PORT, function(err) {        
    if (err)
        throw err
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
