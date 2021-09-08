var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.route("/").post((req, res) => {
    var error_msg = JSON.stringify(req.body.err);
    error_msg = error_msg.replace(/'/g, "");
    const user = req.body.user;
    const scriptname = req.body.scriptName;
    const query =
     "insert into [dbo].[ExceptionLog] ([user], [error_message], [script_name]) values('"+
     user+
     "','"+
     error_msg+
     "','"+
     scriptname+
     "')";
    console.log(query);
    sql.query(connectionString, query, (err, rows) => {
      if (err != null) {
        console.log("Error in Logging Data - "+err);
      }
    });
  });
  
module.exports = router;
  