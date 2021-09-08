var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');
//

const connectionString = conStr.connectionStringForDb;

router.route("/").post((req, res) => {
  var role = req.body.role;
  var user = req.body.user;
  user= user.toLowerCase();
  
  sql.open(connectionString, function(err, conn) {
    var pm = conn.procedureMgr();
    pm.callproc('dbo.update_Role',[role,user],function(err,results,output){
      if (err != null) {
        console.log(err.message);
        var user =  req.get('User');
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: user, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
        res.status(400).json(err.message)
      } else {
          res.json("Role successfully updated");
      }
    });
  });
});

module.exports = router;
