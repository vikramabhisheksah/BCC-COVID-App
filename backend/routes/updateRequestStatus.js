
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
  
  console.log(req.body.selected.length);
  const status_id = req.body.new_status;
  const approver = req.body.approver;
  var countFlag = 1;
  for (i = 0; i < req.body.selected.length; i++) {
    countFlag = countFlag + 1;
    console.log(req.body.selected[i]);
    const request_id = req.body.selected[i];
    const rejection_reason = req.body.rejection_reason;
    console.log("Selected Requests:"+ req.body.selected[i]);
    
    var sqQuery =
      "update Request_Details set request_status="+
      status_id +
      ", [bot_comments]='"+
      rejection_reason+
      "', [approver]='"+
      approver+
      "' where req_no='" +
      request_id+
      "'";

    console.log(sqQuery);
    sql.query(connectionString, sqQuery, (err, rows) => {
      if (err != null) {
        console.log(err.message);
        var user =  req.get('User');
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: user, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
        res.status(400).json(err.message)
      } else {
      }
    });
  }
  if (countFlag > 1) {
    res.json("Request updated successfully.");
  } else {
    res.json("Please select requests to process.");
  }
});


module.exports = router;
