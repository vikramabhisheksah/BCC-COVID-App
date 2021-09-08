var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');


const connectionString = conStr.connectionStringForDb;

router.route("/").get((req, res) => {
  const plant = req.get('plant');
  const query =
    "select [dbo].[Request_Zone].zone_name as zone_name, [dbo].[Request_Zone].zone_value as zone_value from [dbo].[plant_mapping] inner join [dbo].[Request_Zone] on [dbo].[plant_mapping].request_zone_id =  [dbo].[Request_Zone].zone_value"
   +" where [dbo].[plant_mapping].[plant_code]='"
   + plant
   +"'"
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
