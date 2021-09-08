const { query } = require("express");
var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

const connectionString = conStr.connectionStringForDb;

router.route("/new").post((req, res) => {
 

  console.log(req.body);
  const request_zone = req.body.request_zone;
  const request_type = req.body.request_type;
  const requester_type = req.body.requester_type;
  const new_shipping_point = req.body.new_shipping_point;
  const partner_name = req.body.partner_name;
  const text_type = req.body.text_type;
  const text_type_action= req.body.selectedOption_textAction;
  const request_flow = req.body.request_flow;
  const sales_order = req.body.sales_order;
  const old_value = req.body.old_value;
  const new_value = req.body.new_value;
  const requester_email = req.body.requester_email;
  const quotation = req.body.quotation;
  const request_reason = req.body.request_reason;
  const request_status = 1;
  const bot_status = "";
  const bot_comments = "";
  const StatusFlag = 1;
  const additional_notification_to = req.body.additional_notification_to;
  const additional_information = req.body.additional_Information;
  const approver = "";

  sql.open(connectionString, async function(err, conn) {
    var pm = conn.procedureMgr();
    await pm.callproc('dbo.AddRequestDetails',[request_zone,request_type,requester_type,request_flow,
      sales_order,requester_email,quotation,request_reason,request_status,
      StatusFlag, bot_status,bot_comments,additional_notification_to,additional_information, approver,
      old_value,new_value,new_shipping_point,partner_name,text_type,text_type_action],function(err,results,output){
      if (err != null) {
        console.log(err.message);
        var user =  req.ge('User');
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: user, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
        res.status(400).json(err.message)
      } else {
        
      }
    });
    console.log("done");
    res.json("Data successfully added in Main Table & Sub Table");
    
  });
});

module.exports = router;
