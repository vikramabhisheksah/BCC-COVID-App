var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.route("/").post((req, res) => {
    const zone = req.body.request_zone;
    const query =
    "select distinct [dbo].[truck_trailer_mapping].[id] as value,"
    +" CONCAT([dbo].[truck_trailer_mapping].[truck_type], '-', [dbo].[truck_trailer_mapping].[trailer_type], '-', [dbo].[truck_trailer_mapping].[description]) as label "
    +" from [dbo].[truck_trailer_mapping] where [dbo].[truck_trailer_mapping].[zone_id]="
    + zone;
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