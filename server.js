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
    res.status(200).render('students');
});

app.get('/assignments', function(req, res) {
    var query1 = 
    "SELECT assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS name, Projects.title AS project_title " +
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
    res.status(200).render('roles');
});

app.get('/tasks', function(req, res) {
    res.status(200).render('tasks');
});

app.get('/citations', function(req, res) {
    res.status(200).render('citations');
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
    `('${data.title}', '${data.desc}', '${data.startDate}', '${data.endDate}', ${data.isActive}, ${data.isCollab});`

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

app.post('/addAssignment', function(req, res) {
    var data = req.body
    if (data.project == 0) 
        data.project = 'NULL'

    var query1 = "SELECT email FROM Students"
    var query2 = `INSERT INTO Assignments(student_id, project_id) VALUES ` + 
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
    var query2 = `UPDATE Assignments SET student_id = (SELECT student_id FROM Students WHERE email = '${data.email}'), project_id = ${data.project} WHERE assignment_id = ${data.id};`

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