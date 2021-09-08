var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

//

const connectionString = conStr.connectionStringForDb;

router.post("/", async function (req, res) {
  // const request_zone = req.body.request_zone;
  const Delivery_Plant_ID = req.body.Delivery_Plant_ID;
  const sales_org = req.body.sales_org;
  let response="";
  try{
  response= await  axios.get(configData.SERVER_URL + "/api/getZone", {
    headers: {
      'plant':Delivery_Plant_ID,
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
  const request_zone = response.data[0].zone_value;
  const query =
    "select distinct dbo.plant_mapping.plant_id as value,CONCAT(dbo.plant_mapping.plant_code,'-',dbo.plant_mapping.plant_name) as label from dbo.plant_mapping where request_zone_id=" +
    request_zone +
    " and (dbo.plant_mapping.sales_org='" +
    sales_org +
    "' OR dbo.plant_mapping.sales_org ='any')";
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
