const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "BCC_DATA_ENTRY",
    multipleStatements: true,
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Connected");
    }else{
        console.log("Not Connected");
        console.log(err);
    }
});

module.exports = mysqlConnection;