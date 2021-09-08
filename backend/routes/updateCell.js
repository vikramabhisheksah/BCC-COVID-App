var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

//

const connectionString = conStr.connectionStringForDb;

router.route("/update").post((req, res) => {
    var newValue = req.body.newValue;
    newValue = newValue.replace("'","");
    const req_no = req.body.req_no;
    var status ="";
  const query =
        "update Request_Details set additional_notification_to ='"
        + newValue +
        "' where req_no = '"
        + req_no +"'";
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
      console.log("test");
      status="Success";
    }
  });
  res.json(status);
});

module.exports = router;
