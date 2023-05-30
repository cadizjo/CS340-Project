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
app.use(express.static("public/"))              // all files in public directory can be viewed as static files
app.use(express.json())                         // to read/handle/parse JSON objects
app.use(express.urlencoded({extended: true}))
                

/*
    ROUTES
*/

/*
    PROCESS SELECT/READ QUERIES
*/
app.get('/', function(req, res) {
    res.status(200).render('index');    
});              

app.get('/projects', function(req, res) {
    var query = "SELECT * FROM Projects ORDER BY project_id;"
    db.pool.query(query, function(error, rows, fields) {
        res.status(200).render('projects', {data: rows});
    })
});

app.get('/students', function(req, res) {
    var query = "SELECT student_id, CONCAT(f_name, ' ', l_name) AS name, email, phone FROM Students ORDER BY student_id;"
    db.pool.query(query, function(error, rows, fields) {
        res.status(200).render('students', {data: rows});
    })
});

app.get('/assignments', function(req, res) {
    var query1 = 
    "SELECT assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Projects.title AS project_title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
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
    var query1 = "SELECT * FROM Roles ORDER BY role_id;"
    var query2 = 
    "SELECT Assignments.assignment_id AS assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Projects.title AS project_title, Roles.title AS role_title " +
    "FROM Roles " +
    "INNER JOIN Assignments_has_Roles ON Roles.role_id = Assignments_has_Roles.role_id " +
    "INNER JOIN Assignments ON Assignments_has_Roles.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    var query3 = 
    "SELECT Assignments.assignment_id, Students.email, Projects.title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
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
    res.status(200).render('tasks');
});

app.get('/citations', function(req, res) {
    var query1 = "SELECT * FROM Citations ORDER BY citation_id;"
    var query2 = 
    "SELECT Tasks.task_id AS task_id, Tasks.title AS task_title, CONCAT(Students.f_name, ' ', Students.l_name) AS student_name, Projects.title AS project_title, Citations.citation_id AS citation_id " +
    "FROM Citations " +
    "INNER JOIN Tasks_has_Citations ON Citations.citation_id = Tasks_has_Citations.citation_id " +
    "INNER JOIN Tasks ON Tasks_has_Citations.task_id = Tasks.task_id " +
    "INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY task_id;"
    var query3 =
    "SELECT Tasks.task_id AS task_id, Tasks.title AS task_title, Students.email, Projects.title AS project_title " +
    "FROM Tasks " +
    "INNER JOIN Assignments ON Tasks.assignment_id = Assignments.assignment_id " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY task_id;"
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
    var data = req.body
    if (data.desc == '') data.desc = 'NULL'
    if (data.startDate == '') data.startDate = 'NULL'
    if (data.endDate == '') data.endDate = 'NULL'
    if (data.isActive == true) data.isActive = 1
    else if (data.isActive == false) data.isActive = 0
    if (data.isCollab == true) data.isCollab = 1
    else if (data.isCollab == false) data.isCollab = 0
    
    var query1 = `SELECT title FROM Projects;`
    var query2 = `INSERT INTO Projects(title, description, start_date, end_date, is_active, is_collaborative) VALUES ` +
    `('${data.title}', '${data.desc}', ${data.startDate}, ${data.endDate}, ${data.isActive}, ${data.isCollab});`

    db.pool.query(query1, function(error, rows, fields) {
        var project_titles = rows
        var is_valid = true
        // check if project w same title alredy exists in Projects table before inserting new record (since each title must be unique)
        for (var i = 0; i < project_titles.length; i++) {
            if (project_titles[i].title == data.title) {
                is_valid = false
                break
            }
        }
        if (is_valid == false) {
            console.log("project title alredy exists")
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

app.post('/addStudent', function(req, res) {
    var data = req.body
    if (data.phone == '') data.phone = 'NULL'
    
    var query1 = `SELECT email FROM Students;`
    var query2 = `INSERT INTO Students(f_name, l_name, email, phone) VALUES` +
    `('${data.fname}', '${data.lname}', '${data.email}', '${data.phone}');`

    db.pool.query(query1, function(error, rows, fields) {
        var student_emails = rows
        var is_valid = true
        // check if student w same email alredy exists in Students table before inserting new record (since each email must be unique)
        for (var i = 0; i < student_emails.length; i++) {
            if (student_emails[i].email == data.email) {
                is_valid = false
                break
            }
        }
        if (is_valid == false) {
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

    var query1 = "SELECT email FROM Students"
    var query2 = `SELECT assignment_id FROM Assignments ` +
    `WHERE student_id = (SELECT student_id FROM Students WHERE email = '${data.email}') && project_id = ${data.project};`
    var query3 = `INSERT INTO Assignments(student_id, project_id) VALUES ` + 
    `((SELECT student_id FROM Students WHERE email = '${data.email}'), ${data.project});`

    db.pool.query(query1, function(error, rows, fields) {
        var student_emails = rows
        var is_valid = false
        // check if email exists in Students table before inserting new record
        for (var i = 0; i < student_emails.length; i++) {
            if (student_emails[i].email == data.email)
                is_valid = true
        }
        if (is_valid == false) {
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
    
    var query1 = `SELECT title FROM Roles;`
    var query2 = `INSERT INTO Roles(title) VALUES ('${data.role}');`

    db.pool.query(query1, function(error, rows, fields) {
        var role_titles = rows
        var is_valid = true
        // check if role w same title alredy exists in Roles table before inserting new record (since each role title must be unique)
        for (var i = 0; i < role_titles.length; i++) {
            if (role_titles[i].title.toLowerCase() == data.role.toLowerCase()) {
                is_valid = false
                break
            }
        }
        if (is_valid == false) {
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

    var query1 = "SELECT email FROM Students"
    var query2 = `SELECT assignment_id FROM Assignments ` +
    `WHERE student_id = (SELECT student_id FROM Students WHERE email = '${data.email}') && project_id = ${data.project};`
    var query3 = `UPDATE Assignments SET student_id = (SELECT student_id FROM Students WHERE email = '${data.email}'), project_id = ${data.project} WHERE assignment_id = ${data.id};`

    db.pool.query(query1, function(error, rows, fields) {
        var student_emails = rows
        var is_valid = false
        // check if email exists in Students table before updating selected record
        for (var i = 0; i < student_emails.length; i++) {
            if (student_emails[i].email == data.email)
                is_valid = true
        }
        if (is_valid == false) {
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

// gets data about a specific assignment record
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