const mysql = require('mysql');
require('dotenv').config()

const mysqlConnection = mysql.createConnection({

    //host: 'localhost',
    //port: '3306',
    //user: 'root',
    //password: '1234',
    //database: 'empresas_db'
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

mysqlConnection.connect(function (error) {
    if (error) {
        console.log(error);
        return;

    } else {
        console.log('Conectando A DB MySQL...')
        console.log("OK! Conectado");
    }
});

module.exports = mysqlConnection;