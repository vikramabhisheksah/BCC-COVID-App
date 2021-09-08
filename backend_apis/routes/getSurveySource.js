var express = require("express");
var router = express.Router();
const mysqlConnection = require("../config/connection");

router.get("/",  function (req, res) {

    const query = "Select id_survey_source as id, survey_source_label as title from survey_source";
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