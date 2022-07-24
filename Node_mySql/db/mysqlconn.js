const mysql = require('mysql');

var mysplConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'freshlite4'
})

mysplConnection.connect((err) => {
    if (err) {
        console.log(`db connection failed ${err.stack}`);
    } else {
        console.log(`db connection successfull ${mysplConnection.threadId}`)
    }
})

module.exports = mysplConnection