/*
    Citation Scope: NodeJS Express-based server, database connection setup, and Handlebar Templates
    Date: 06/07/2023
    Originality: Server and database connector setup copied from the the CS 340 starter code. Handlebar Templates adapt from the CS 340 starter code.
    Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : ''
})

// Export it for use in our applicaiton
module.exports.pool = pool;

/*
module.exports = {
    pool: pool
    ...
}
*/