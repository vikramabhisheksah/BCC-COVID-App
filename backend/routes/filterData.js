const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
const sql = require("msnodesqlv8");
const conStr = require("../config/keys");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

router.route("/findSo").post((req, res) => {
  const filterValue = req.body.value;
  console.log(req.body.value);
  const connectionString = conStr.connectionStringForValidation;
  const dbQuery =
    "select dbo.t_ZXXVL.Invoice,dbo.t_ZCDP.[Customer Ref PO] as Customer_Ref_PO, dbo.t_ZCDP.[Shipping Point] as Shipping_Point, "
    +"dbo.t_ZCDP.Route,dbo.t_ZCDP.[Delivery Plant ID] as Delivery_Plant_ID,dbo.t_ZCDP.[Material Available Date] as Mad, "
    +"dbo.t_ZCDP.[Quotation Number] as Quotation,dbo.t_ZCDP.SalesOrderLineID as lineItem, "
    +"dbo.t_ZCDP.[Quantity Ordered] as quantity_orderd , dbo.t_ZXXVL.[PO Date] as po_date, "
    +"dbo.t_ZCDP.[Sales Organization] as sales_org, dbo.t_ZXXVL.[Unload Pt] as unload_pt, dbo.t_ZXXVL.[Receiv Pt] as receive_pt, "
    +"dbo.t_ZXXVL.[Del Blk] as Delivery_Blk, CONCAT(dbo.[t_ZCDP].[Truck Type],'-',dbo.[t_ZCDP].[Trailer Type]) as truck_trailer_type from (dbo.t_ZXXVL inner join dbo.t_ZCDP on dbo.t_ZCDP.[Order ID]=dbo.t_ZXXVL.SalesDocno) where dbo.t_ZXXVL.SalesDocno=" +
    filterValue
  console.log(dbQuery);
  sql.query(connectionString, dbQuery, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

router.post("/GetDuplicate", function (req, res, next) {
  const connectionString = conStr.connectionStringForDb;
  console.log(req.body);
  const request_zone = req.body.request_zone;
  const request_type = req.body.request_type;
  const requester_type = req.body.requester_type;
  const new_shipping_point = req.body.new_shipping_point;
  const request_flow = req.body.request_flow;
  const sales_order = req.body.sales_order;
  const old_value = req.body.old_value;
  const new_value = req.body.new_value;
  const requester_email = req.body.requester_email;
  const quotation = req.body.quotation;
  const requst_reason = req.body.request_reason;
  const dbQuery =
    "select count(1) from (Request_Details inner join Request_SKU_Details on Request_Details.req_no = Request_SKU_Details.req_no) " +
    "where Request_zone=" +
    request_zone +
    " and request_type=" +
    request_type +
    " and request_flow=" +
    request_flow +
    " and sales_order='" +
    sales_order +
    "' and request_reason=" +
    requst_reason +
    " and requester_type=" +
    requester_type+
    " and new_shipping_point='"+
    new_shipping_point+
    "' and old_value = '"+
    old_value+
    "' and new_value = '" +
    new_value +
    "'";
  console.log(dbQuery);
  sql.query(connectionString, dbQuery, (err, rows) => {
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

router.post("/fetchZCDP", function (req, res, next) {
  const salesOrder = req.body.value;
  console.log(req.body.value);
  const connectionString = conStr.connectionStringForValidation;
  const dbQuery =
    "select * from dbo.t_ZCDP where dbo.t_ZCDP.[Order ID] = " +
    salesOrder;
  console.log(dbQuery);
  sql.query(connectionString, dbQuery, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    } else {
      console.log(rows[0]);
      res.json(rows);
    }
  });
});

router.post("/updateZCDP", function (req, res, next) {
  var data = req.body;
  data = JSON.stringify(data)
  console.log(data);
  const connectionString = conStr.connectionStringForDb;
  sql.open(connectionString, function(err, conn) {
    var pm = conn.procedureMgr();
    pm.callproc('[dbo].[upload_ZCDP]',[data],function(err,results,output){
      if (err != null) {
        console.log(err.message);
        var user =  req.get('User');
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: user, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
        res.status(400).json(err.message)
      } else {
        console.log(results);
        res.json("success")

      }
    });
  });
});

router.post("/fetchZXXVL", function (req, res, next) {
  const salesOrder = req.body.value;
  console.log(req.body.value);
  const connectionString = conStr.connectionStringForValidation;
  const dbQuery =
    "select * from dbo.t_ZXXVL where dbo.t_ZXXVL.[SalesDocno] = " +
    salesOrder;
  console.log(dbQuery);
  sql.query(connectionString, dbQuery, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    } else {
      console.log(rows[0]);
      res.json(rows);
    }
  });
});

router.post("/updateZXXVL", function (req, res, next) {
  var data = req.body;
  data = JSON.stringify(data)
  console.log(data);
  const connectionString = conStr.connectionStringForDb;
  sql.open(connectionString, function(err, conn) {
    var pm = conn.procedureMgr();
    pm.callproc('[dbo].[upload_ZXXVL]',[data],function(err,results,output){
      if (err != null) {
        console.log(err.message);
        var user =  req.get('User');
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: user, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
        res.status(400).json(err.message)
      } else {
        console.log(results);
        res.json("success")

      }
    });
  });
});
module.exports = router;
