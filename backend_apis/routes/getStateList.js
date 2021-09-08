var express = require("express");
var router = express.Router();
const mysqlConnection = require("../config/connection");

router.get("/",  function (req, res) {

    const query = "Select id_us_states as id, state_name as title from us_states";
    mysqlConnection.query(query,(err, rows,fields)=>{
        if(!err){
            console.log(rows);
            res.send(rows);

        }
        else{
            console.log(err);
        }
    })
});
module.exports = router;