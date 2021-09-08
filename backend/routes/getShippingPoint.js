var express = require("express");
const { query } = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.post("/", async function (req, res){
  let request_zone = req.body.request_zone;
  const plant_code = req.body.plant_code;

  if (request_zone == ""){
    let response="";
  try{
  response= await  axios.get(configData.SERVER_URL + "/api/getZone", {
    headers: {
      'plant':plant_code,
    }});
  }catch(error){
    if (error.response) {
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    }
  }
   request_zone = response.data[0].zone_value;
  }
  const query =
    "select distinct dbo.shipping_point_mapping.id as value, CONCAT([dbo].[shipping_point_mapping].[shipping_points],' - ',[dbo].[shipping_point_mapping].description) as label from [dbo].[shipping_point_mapping] where request_zone_id=" +
    request_zone +
    " and [dbo].[shipping_point_mapping].plant_code='" +
    plant_code +
    "'";
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
