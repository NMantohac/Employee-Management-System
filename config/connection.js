// Require MySQL2 dependency
const mysql = require('mysql2');

// Create a connection with the local MySQL database and export it
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_tracker_db',
}).promise();

module.exports = connection;
