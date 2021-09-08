var express = require("express");
var router = express.Router();
const mysqlConnection = require("../config/connection");

router.get("/",  function (req, res) {

    const query = "Select id_race as id, race_label as title from race";
    mysqlConnection.query(query,(err, rows,fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
});
module.exports = router;