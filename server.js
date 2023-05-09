/*
    SETUP
*/
var express = require('express');               // use express library for web server
var app = express();                            // instantiate an express object to interact with the server in our code
PORT = 4261;                                    // receives incoming requests on specified PORT

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static("public/"))              // all files in public directory can be viewed as static files
                

/*
    ROUTES
*/
app.get('/', function(req, res) {
    res.render('index');    
});                                         

/*
    LISTENER
*/
app.listen(PORT, function() {        
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});