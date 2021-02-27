const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'agenda_petshop',
    port: 3306
});

const dataBaseConnectedMessage = () => {
    return `
    ************************************************        
    ***                                          ***        
    ***            DATABASE CONNECTED            ***        
    ***                                          ***        
    ************************************************
    `;
}

module.exports = new Promise((resolve, reject) => {
    connection.connect((error) => {
        if (error) {
            console.error(error.stack)
            reject(error);
            return;
        }
        console.log(dataBaseConnectedMessage());
        resolve(connection);
    })
});



