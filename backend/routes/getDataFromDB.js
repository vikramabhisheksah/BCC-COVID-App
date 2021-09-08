var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
const { use } = require("./getUserRole");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

//

const connectionString = conStr.connectionStringForDb;

/* GET all data from table */
router.get("/getall", function (req, res, next) {
  var query =
    "select distinct dbo.Request_Details.req_no as Request_id, Request_Details.quotation as quotation_number,"+
    "Request_SKU_Details.sku_no as sku_no, Request_SKU_Details.material as material_no,dbo.Request_Zone.zone_name as request_zone,"+
    "dbo.Request_Type.request_type_name as request_type,dbo.Requestor_Type.requestor_type_name as requestor_type,"+
    "dbo.Request_SKU_Details.new_shipping_point as new_shipping_point,dbo.Request_Flow.request_flow_name as request_flow,dbo.Request_Details.sales_order as sales_order, "+
    "dbo.t_ZXXVL.[Cred Blk] as credit_block, dbo.t_ZXXVL.[Del Blk] as delivery_block,"+
    "dbo.t_ZXXVL.[Sold-to] as sold_to_num, dbo.t_ZCDP.[Incoterms (Part 1)] as inco_terms, dbo.t_ZCDP.[Sales Organization] as sales_org,"+
    "dbo.t_ZCDP.[Customer Ref PO] as cust_po_num, dbo.t_ZCDP.[Destination Country] as ship_to_country,"+
    "dbo.Request_SKU_Details.old_value as old_value,dbo.Request_SKU_Details.new_value as new_value,  CONVERT(varchar,dbo.t_ZXXVL.[PO Date], 105) as po_date ,"+
    "dbo.t_ZCDP.[delivery no] as delivery_no,dbo.t_ZCDP.[Shipment Number1] as shipment_no,dbo.t_ZCDP.[Order Type] as order_type,dbo.Request_Details.requester_email as requester_email,"+
    "dbo.Request_Reason.request_Reason_name as request_reason,dbo.Request_Details.additional_information as additional_information, "+
    "Request_Status.request_status_name as request_status, dbo.Request_Details.additional_notification_to as additional_notification_to, "+
    "CONVERT(varchar,dbo.Request_Details.creation_date, 105) as creation_date, CONVERT(varchar,dbo.Request_Details.updation_date , 105) as updateion_date,"+
    "dbo.Request_Details.bot_status,dbo.Request_Details.bot_comments, dbo.t_ZXXVL.[Reason Rej] as Reason_Rej, "+
    "dbo.Request_Details.approver as approver, CONVERT(varchar,dbo.t_ZCDP.[Date Order Registered], 105) as date_order_registered  from (((((((((dbo.Request_Details "+
    "inner join  dbo.Request_Zone on dbo.Request_Zone.zone_value=dbo.Request_Details.Request_zone) "+
    "inner join dbo.Request_Type on dbo.Request_Type.request_type_id=dbo.Request_Details.request_type) "+
    "inner join dbo.Requestor_Type on dbo.Requestor_Type.requestor_type_id=dbo.Request_Details.requester_type)  "+
    "inner join dbo.Request_Flow on dbo.Request_Flow.request_flow_id= dbo.Request_Details.request_flow) "+
    "inner join dbo.Request_Reason on dbo.Request_Reason.request_Reason_id=dbo.Request_Details.request_reason) "+
    "inner join dbo.Request_SKU_Details on dbo.Request_SKU_Details.req_no=dbo.Request_Details.req_no) "+
    "inner join dbo.Request_Status on dbo.Request_Status.request_status_id=dbo.Request_Details.request_status) "+
    "inner join dbo.t_ZCDP on dbo.Request_Details.sales_order=dbo.t_ZCDP.[Order ID]) "+
    "inner join dbo.t_ZXXVL on dbo.t_ZXXVL.SalesDocno = dbo.Request_Details.sales_order) ";

  var userRole = req.get('userRole');
  var requester_email = req.get('requesterEmail');
  requester_email = requester_email.toLowerCase();
  if (userRole == 1){
    query = query + " where dbo.Request_Details.[requester_email]='" + requester_email + "'";
  }
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
      res.json(rows);
    }
  });
});

module.exports = router;
