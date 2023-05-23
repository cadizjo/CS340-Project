/*
    SETUP
*/
var express = require('express');               // use express library for web server
var app = express();                            // instantiate an express object to interact with the server in our code
PORT = 4261;                                    // receives incoming requests on specified PORT
var db = require('./database/db-connector')     // database to process queries


const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static("public/"))              // all files in public directory can be viewed as static files
app.use(express.json())                         // to read JSON string objects
                

/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.status(200).render('index');    
});              

app.get('/projects', function(req, res) {
    res.status(200).render('projects');
});

app.get('/students', function(req, res) {
    res.status(200).render('students');
});

app.get('/assignments', function(req, res) {
    res.status(200).render('assignments');
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