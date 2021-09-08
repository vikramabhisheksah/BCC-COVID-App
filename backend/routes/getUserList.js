var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.route("/").post((req, res) => {
  var role = req.body.role;
  console.log(role);

  const query =
    "select [user_email] from [dbo].[User_Access] where [user_role]="+
    role;
  console.log(query);
  sql.query(connectionString, query, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

module.exports = router;
