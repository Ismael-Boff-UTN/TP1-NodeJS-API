const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({

    //host: 'localhost',
    //port: '3306',
    //user: 'root',
    //password: '1234',
    //database: 'empresas_db'
    host: 'sql10.freemysqlhosting.net',
    port: '3306',
    user: 'sql10400594',
    password: 'y736ytKqLx',
    database: 'sql10400594'

})

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