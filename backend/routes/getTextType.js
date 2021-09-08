var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.route("/").get((req, res) => {
  const query =
    " select distinct [dbo].[Text_Change_Type].[id] as value,  [dbo].[Text_Change_Type].[Type] as label from [dbo].[Text_Change_Type] order by value";
    sql.query(connectionString, query, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;