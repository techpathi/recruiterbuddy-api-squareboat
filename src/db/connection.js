const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});
module.exports = connection;