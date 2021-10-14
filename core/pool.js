const mysql = require('mysql');
/**
 * Connection to the database.
 *  */
const con = mysql.createConnection({
    host: 'localhost',
    user: 'httpserver', 
    password: 'newpassword', 
    database: 'nodelogin'
});
con.connect(function(err){
    if (err) throw err;
    console.log('Database is connected successfully')
})



module.exports = con;
