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
    var query = 
    "SELECT assignment_id, CONCAT(Students.f_name, ' ', Students.l_name) AS name, Projects.title AS project_title " +
    "FROM Assignments " +
    "INNER JOIN Students ON Assignments.student_id = Students.student_id " +
    "LEFT JOIN Projects ON Assignments.project_id = Projects.project_id " +
    "ORDER BY assignment_id;"
    db.pool.query(query, function(error, rows, fields) {
        res.status(200).render('assignments', {data: rows});
    })
});

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

app.get('/roles', function(req, res) {
    res.status(200).render('roles');
});

app.get('/tasks', function(req, res) {
    res.status(200).render('tasks');
});

app.get('/citations', function(req, res) {
    res.status(200).render('citations');
});

app.post("/updateAssignment", function (req, res) {
    console.log("\nUpdate Assignment ID: ", req.body.id)
});

app.post("/deleteAssignment", function (req, res) {
    console.log("\nDelete Assignment ID: ", req.body.id)
});

app.post("/deleteProject", function (req, res) {
    console.log("\nDelete Project ID: ", req.body.id)
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