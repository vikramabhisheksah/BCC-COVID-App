var express = require("express");
var router = express.Router();
var axios = require("axios");

var dateFormat = require("dateformat");
const tempfile = require("tempfile");
const sql = require("msnodesqlv8");
var fs = require("fs");
const Moment = require("moment");
const fetch = require('node-fetch');
const { json } = require("body-parser");

const conStr = require("../config/keys");
const configData = require("./config.json");
var path = require('path');
const { isUndefined } = require("util");

var connectionString = conStr.connectionStringForDb;

// var _dir = "public/temp_files/";
var _dir="C:\\OOC_Temp\\";

function  get_info(
  connectionString,
  request_zone,
  request_type,
  requester_type,
  new_shipping_point,
  partner_func,
  text_change_type,
  text_change_action,
  request_flow,
  sales_order,
  old_value,
  new_value,
  requester_email,
  quotation,
  request_reason,
  request_status,
  StatusFlag,
  bot_status,
  bot_comments,
  additional_Information,
  additional_notification_to,
  approver,
  callback
) {
  connectionString = conStr.connectionStringForValidation;
  const dbQuery ="select dbo.t_ZXXVL.Invoice,dbo.t_ZCDP.[Customer Ref PO] as Customer_Ref_PO, dbo.t_ZCDP.[Shipping Point] as Shipping_Point, "
  +"dbo.t_ZCDP.Route,dbo.t_ZCDP.[Delivery Plant ID] as Delivery_Plant_ID,dbo.t_ZCDP.[Material Available Date] as Mad, "
  +"dbo.t_ZCDP.[Quotation Number] as Quotation,dbo.t_ZCDP.SalesOrderLineID as lineItem, "
  +"dbo.t_ZCDP.[Quantity Ordered] as quantity_orderd , dbo.t_ZXXVL.[PO Date] as po_date, "
  +"dbo.t_ZCDP.[Sales Organization] as sales_org, dbo.t_ZXXVL.[Unload Pt] as unload_pt, dbo.t_ZXXVL.[Receiv Pt] as receive_pt, "
  +"dbo.t_ZXXVL.[Del Blk] as Delivery_Blk, CONCAT(dbo.[t_ZCDP].[Truck Type],'-',dbo.[t_ZCDP].[Trailer Type]) as truck_trailer_type from (dbo.t_ZXXVL inner join dbo.t_ZCDP on dbo.t_ZCDP.[Order ID]=dbo.t_ZXXVL.SalesDocno) where dbo.t_ZXXVL.SalesDocno=" +
  sales_order;

  console.log(dbQuery);
  sql.query(connectionString, dbQuery, async (err, rows) => {
    if (err != null) {
      throw "Error in connecting to DB";
    }
    var processFlag = false;
    if (rows.length > 0) {
      var ErrMessage = "";
      let response="";
      
      try{
      response= await  axios.get(configData.SERVER_URL + "/api/getZone", {
        headers: {
          'plant':rows[0].Delivery_Plant_ID,
        }});
      }catch(error){
        processFlag = false;
        ErrMessage = "Error in fetching zone"
      }
      request_zone = response.data[0].zone_value;
      console.log("request zone:" + request_zone);
      quotation = rows[0].Quotation;
      if (request_type === 4) {
        old_value = rows[0].Customer_Ref_PO;
        if (typeof new_value === "number") {
          new_value = new_value.toString();
        }
        if (new_value.length <= 20) {
          processFlag = true;
        } else {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      } else if (request_type === 2) {
        old_value = rows[0].quantity_orderd;
        if (!Number(new_value)) {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        } else {
          processFlag = true;
        }
      } else if (request_type === 3) {
        old_value = Moment(rows[0].Mad
          ).format("DD-MM-YYYY");
        new_value = new_value.toString().replace(/\//g,'-');
        var testDate = Moment(new_value, "DD-MM-YYYY").isValid();

        if (testDate == true) {
          testVal = Moment(new_value, "DD-MM-YYYY", true).format("MM/DD/YYYY");
          new_value = Moment(new_value, "DD-MM-YYYY", true).format(
            "DD-MM-YYYY"
          );
          var x1 = Moment().format("MM/DD/YYYY");
          var date1 = new Date(x1);
          var date2 = new Date(testVal);
          var timeDiff = Math.abs(date2.getTime()) - Math.abs(date1.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          console.log("correct day diffrence:" + diffDays);
          if (diffDays >= 0) {
            processFlag = true;
          } else {
            processFlag = false;
            ErrMessage = "incorrect new value.";
          }
        } else {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      }
      else if (request_type === 5) {
        old_value = rows[0].Delivery_Plant_ID;
        if(request_zone == 1){
          if (new_shipping_point === "") {
            processFlag = false;
            ErrMessage = "new shipping point cannot be empty";
          }else{
            if (typeof new_shipping_point === "number") {
              new_shipping_point = new_shipping_point.toString();
            }
            let shipping_pt_list = [];
            var spData2 ={plant_code:rows[0].Delivery_Plant_ID,request_zone:request_zone};
              const getShippingPtList  = async (spData2) => {

                console.log(spData2)
                await axios.post(configData.SERVER_URL +"/api/getShippingPoint",spData2)
                  .then(res => {
                    shipping_pt_list = res.data;
                  })
                  .catch(error => {
                      console.log(error.response.data);
                  });
                var val = shipping_pt_list.find(x => x.label.substr(0,4).toLowerCase() === new_shipping_point.toLowerCase());
                return(val!== undefined);
              };
            if(!await getShippingPtList(spData2)){
              processFlag = false;
              ErrMessage = "incorrect new shipping Pt.";
              return callback(ErrMessage);
            }
          }
        }
        if (typeof new_value === "number") {
          new_value = new_value.toString();
        }
        let plant_list = [];
        var reqData={sales_org:rows[0].sales_org,Delivery_Plant_ID:rows[0].Delivery_Plant_ID};
          const getPlantList  = async (reqData) => {
            await axios.post(configData.SERVER_URL +"/api/getPlant", reqData)
              .then(res => {
                plant_list = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });
            var val = plant_list.find(x => x.label.substr(0,4).toLowerCase() === new_value.toLowerCase());
            return(val!== undefined);
          };

        if (new_value.length == 4 && await getPlantList(reqData)) {
          processFlag = true;
        } else {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
        
      } else if (request_type === 6) {
        old_value = rows[0].Shipping_Point;
        if (typeof new_value === "number") {
          new_value = new_value.toString();
        }
        let shipping_pt_list = [];
        var spData2 ={plant_code:rows[0].Delivery_Plant_ID,request_zone:request_zone};
          const getShippingPtList  = async (spData2) => {
            await axios.post(configData.SERVER_URL +"/api/getShippingPoint",spData2)
              .then(res => {
                shipping_pt_list = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });
            var val = shipping_pt_list.find(x => x.label.substr(0,4).toLowerCase() === new_value.toLowerCase());
            return(val!== undefined);
          };
        
        if (new_value.length == 4 && await getShippingPtList(spData2)) {
          processFlag = true;
        } else {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      } else if (request_type === 7) {
        old_value = rows[0].Route;
        if (typeof new_value === "number") {
          new_value = new_value.toString();
        }
        if (new_value.length == 6) {
          let val = new_value;
          if (!(((val.substr(0,2).toUpperCase())==="MX")&&(isNaN(val.substr(2,1)))&&(isNaN(val.substr(3,1)))&&(!isNaN(val.substr(4,2)))))
          {
          processFlag = true;
          }
          else {
            processFlag = false;
            ErrMessage = "incorrect new value.";
          }
        } else {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      } else if (request_type === 1) {
        old_value = "";
        new_value = "";
        new_shipping_point = "";
        processFlag = true;
      } else if (request_type === 8) {
        old_value = Moment(rows[0].po_date
          ).format("DD-MM-YYYY");
        new_value = new_value.toString().replace(/\//g,'-');
        var testDate = Moment(new_value, "DD-MM-YYYY").isValid();
        console.log("check date :-" + testDate);
        if (testDate !== true) {
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }else{
          processFlag = true;
        }
      }else if(request_type === 9){
        let bycoList = [];
          const getByCoList  = async () => {
            await axios.get(configData.SERVER_URL +"/api/getBuyco")
              .then(res => {
                bycoList = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });
            var val = bycoList.find(x => x.label.toLowerCase() === new_value.toLowerCase());
            return(val!== undefined);
          };
        if(await getByCoList()){
          processFlag = true;
        }else{
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      }else if(request_type === 10){
        let portDoorList = [];
          const getPortDoor  = async () => {
            await axios.get(configData.SERVER_URL +"/api/getPortDoor")
              .then(res => {
                portDoorList = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });

            var val = portDoorList.find(x => x.label.substr(0,2).toLowerCase() === new_value.toLowerCase());
            return(val!== undefined);
          };
        if(await getPortDoor()){
          processFlag = true;
        }else{
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      }else if (request_type === 11 || request_type== 12) {

        old_value = request_type===11 ? rows[0].unload_pt:rows[0].receive_pt;

        if (new_value.match(/^[A-Za-z ]*$/) && new_value.substr(0,2).toLowerCase()=== old_value.substr(0,2).toLowerCase()) {
          if ((new_value.length === 6 && request_zone ===1) || (new_value.length === 5 && (request_zone ===2 || request_zone ===3))){
            processFlag = true;
          }else{
            processFlag = false;
            ErrMessage = "incorrect new value.";
          }
          
        }else{
          processFlag = false;
          ErrMessage = "incorrect new value.";
        }
      }else if (request_type === 13){
        let partnerFuncList = [];
          const getPartnerFunc  = async () => {
            await axios.get(configData.SERVER_URL +"/api/getPartnerFunc")
              .then(res => {
                partnerFuncList = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });
              
            var val = partnerFuncList.find(x => x.label.substr(0,2).toLowerCase() === partner_func.toLowerCase());
            if (val!== undefined){
              partner_func = val.value
            } else{
              partner_func = "";
            }
            return(partner_func !== "");
          };

          if(await getPartnerFunc()){
            if(/^\d+$/.test(new_value) && new_value.toString().length=== 8){
              processFlag = true;
            }else{
            processFlag = false;
            ErrMessage = "incorrect new value";
            }
          }else{
            processFlag = false;
            ErrMessage = "incorrect partner Function.";
          }
      }else if (request_type === 15){
        old_value = rows[0].Delivery_Blk;
        if(!new_value === ""){
          new_value = new_value.toString().replace(/\//g,'-');
          var testDate = Moment(new_value, "DD-MM-YYYY").isValid();

          if (testDate == true) {
            testVal = Moment(new_value, "DD-MM-YYYY", true).format("MM/DD/YYYY");
            new_value = Moment(new_value, "DD-MM-YYYY", true).format(
              "DD-MM-YYYY"
            );
            var x1 = Moment().format("MM/DD/YYYY");
            var date1 = new Date(x1);
            var date2 = new Date(testVal);
            var timeDiff = Math.abs(date2.getTime()) - Math.abs(date1.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log("Diff Days" + diffDays);
            if (diffDays >= 0) {
              processFlag = true;
            } else {
              processFlag = false;
              ErrMessage = "incorrect new value.";
            }
          }else {
            processFlag = false;
            ErrMessage = "incorrect new value.";
          }
        }else{
          processFlag =true;
        }
      }else if (request_type === 16){
        if(/^\d+$/.test(new_value) && new_value.length=== 4){
          processFlag = true;
        }else{
          processFlag = false;
          ErrMessage = "incorrect new value";
        }
      }else if (request_type === 17){
        let textChangeList = [];
        const getTextType  = async () => {
          await axios.get(configData.SERVER_URL +"/api/getTextType")
            .then(res => {
              textChangeList = res.data;
            })
            .catch(error => {
                console.log(error.response.data);
            });
            
          var val = textChangeList.find(x => x.label.toLowerCase() === text_change_type.toLowerCase());
          if (val!== undefined){
            text_change_type = val.value
          } else{
            text_change_type = "";
          }
          return(text_change_type !== "");
        };
        if(await getTextType()){
          if(text_change_action.toLowerCase() === "replace" || text_change_action.toLowerCase() === "append" ){
            processFlag = true;
          }else{
            processFlag = false;
            ErrMessage = "incorrect text change action";
          }
        }else{
          processFlag = false;
          ErrMessage = "incorrect text change type";
        }
      }else if (request_type === 18){
        old_value = rows[0].truck_trailer_type;
        let truckTrailerList = [];
        var zone = {request_zone:request_zone};
          const getTruckTrailer  = async (zone) => {
            await axios.post(configData.SERVER_URL +"/api/getTruckTrailer",zone)
              .then(res => {
                truckTrailerList = res.data;
              })
              .catch(error => {
                  console.log(error.response.data);
              });
            var val = truckTrailerList.find(x => {
              var str = x.label;
              var start = str.indexOf("-") + 1
              var index =str.indexOf("-", start);
              console.log(str.substr(0,index));
              str.substr(0,index).toLowerCase() === new_value.toLowerCase()
            });
            return(val!== undefined);
          };
        if(await getTruckTrailer(zone)){
          processFlag = true;
          }else{
            processFlag = false;
            ErrMessage = "incorrect new value";
          }
      }
      //************************************* *check duplicate/*************** */
      if (old_value === null){
        old_value = "";
      }
      if (new_value === null){
        new_value ="";
      }
      if (processFlag == true) {
        const dbQuery =
          "select count(1) as counter from (Request_Details inner join Request_SKU_Details on Request_Details.req_no = Request_SKU_Details.req_no) where request_zone=" +
          request_zone +
          " and request_type=" +
          request_type +
          " and new_shipping_point='" +
          new_shipping_point +
          "' and request_flow=" +
          request_flow +
          " and sales_order='" +
          sales_order +
          "' and old_value='" +
          old_value +
          "' and new_value='" +
          new_value +
          "' and request_reason=" +
          request_reason +
          " and requester_type=" +
          requester_type;

        connectionString = conStr.connectionStringForDb;
        console.log(dbQuery);
        sql.query(connectionString, dbQuery, (err, rows) => {
          if (err != null) {
            console.log(err.message);
            var scriptName = path.basename(__filename);
            var value = {err: err.message, user: requester_email, scriptName:scriptName};
            axios.post(configData.SERVER_URL + "/api/logToDB", value);
            return callback("Request Creation Failed");
          } else {
            console.log(
              "data available in db :" +
              rows[0].counter +
                "data counter :" +
                rows.length
            );
            if (rows[0].counter > 0) {
              processFlag = false;
              return callback("Duplicate Request.");
            } else {
              if (processFlag == true) {
                var connectionStr = conStr.connectionStringForValidation;
                var dbQuery =
                "select * from dbo.t_ZCDP where dbo.t_ZCDP.[Order ID] = " +
                sales_order;
                console.log(dbQuery);
                sql.query(connectionStr, dbQuery, (err, rows) => {
                  if (err != null) {
                    console.log(err.message);
                    var scriptName = path.basename(__filename);
                    var value = {err: err.message, user: requester_email, scriptName:scriptName};
                    axios.post(configData.SERVER_URL + "/api/logToDB", value);
                    return callback("Error in updating data to DB");
                  } else {
                    data = JSON.stringify(rows[0])

                    const connectionString = conStr.connectionStringForDb;
                    sql.open(connectionString, function(err, conn) {
                      var pm = conn.procedureMgr();
                      pm.callproc('[dbo].[upload_ZCDP]',[data],function(err,results,output){
                        if (err != null) {
                          console.log(err.message);
                          var scriptName = path.basename(__filename);
                          var value = {err: err.message, user: requester_email, scriptName:scriptName};
                          axios.post(configData.SERVER_URL + "/api/logToDB", value);
                          return callback("Error in updating data to DB");
                        } else {

                          var connectionStr = conStr.connectionStringForValidation;
                          var dbQuery =
                            "select * from dbo.t_ZXXVL where dbo.t_ZXXVL.[SalesDocno] = " +
                            sales_order;
                          console.log(dbQuery);
                          sql.query(connectionStr, dbQuery, (err, rows) => {
                            if (err != null) {
                              console.log(err.message);
                              var scriptName = path.basename(__filename);
                              var value = {err: err.message, user: requester_email, scriptName:scriptName};
                              axios.post(configData.SERVER_URL + "/api/logToDB", value);
                              return callback("Error in updating data to DB");
                            } else {

                              data = JSON.stringify(rows[0])

                              const connectionString = conStr.connectionStringForDb;
                              sql.open(connectionString, function(err, conn) {
                                var pm = conn.procedureMgr();
                                pm.callproc('[dbo].[upload_ZXXVL]',[data],function(err,results,output){
                                  if (err != null) {
                                    console.log(err.message);
                                    var scriptName = path.basename(__filename);
                                    var value = {err: err.message, user: requester_email, scriptName:scriptName};
                                    axios.post(configData.SERVER_URL + "/api/logToDB", value);
                                    return callback("Error in updating data to DB");
                                  } else {

                                    var connectionString = conStr.connectionStringForDb;
                                    sql.open(connectionString, function(err, conn) {
                                      var pm = conn.procedureMgr();
                                      pm.callproc('dbo.AddRequestDetails',[request_zone,request_type,requester_type,request_flow,
                                        sales_order,requester_email,quotation,request_reason,request_status,
                                        StatusFlag, bot_status,bot_comments,additional_notification_to,additional_Information,approver,
                                        old_value,new_value,new_shipping_point,partner_func, text_change_type,
                                        text_change_action],function(err,results,output){
                                        if (err != null) {
                                          console.log(err.message);
                                          var scriptName = path.basename(__filename);
                                          var value = {err: err.message, user: requester_email, scriptName:scriptName};
                                          axios.post(configData.SERVER_URL + "/api/logToDB", value);
                                          return callback("Error in updating data to DB");
                                        } else {
                                          return callback("Request raised successfully.");
                                        }
                                      });
                                    });
                                  }
                                });
                              });
                            }
                          });
                        }
                      });
                    });
                  }
                });
                      
              }
            }
          }
        });
      } else {
        return callback(ErrMessage);
      }
    } else {
      return callback("Sales order not found in Database.");
    }
  });
}




router.post("/", async function (req, res) {
  var XLSX = require("xlsx-populate");
  var multer = require("multer");
  if (!fs.existsSync(_dir)){
    fs.mkdirSync(_dir);
  }
  var requester_email;
  var outFile = "";
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "C:\\OOC_Temp");
      console.log(file)
    },
    filename: function (req, file, cb) {
      cb(null, vUpFileName(req, file));
      var FileName = outFile;
      console.log(FileName);
    },
  });
  var vUpFileName = function (req, file) {
    outFile =
      file.originalname.substring(0, file.originalname.indexOf(".xlsx")) +
      "-" +
      Date.now() +
      ".xlsx";
    return outFile;
  };

  var upload = multer({ storage: storage }).single("file");
  upload(req, res, async function (err) {
    var vFileName = outFile;  
    if(err instanceof multer.MulterError)
    {console.log(err);}
    else if(err){
      console.log(err);
    }
    
    requester_email = req.get('email');
    axios.defaults.headers.common['User'] = requester_email;

    var sqlquery = "Insert into Request_Upload_status([Upload_Status],[user_email],[File_name]) values('In progress','"+
    requester_email+
    "','"+
    vFileName+
    "')";
    sql.query(connectionString, sqlquery, (err, rows) => {
      if (err != null) {
        console.log(err.message);
        var scriptName = path.basename(__filename);
        var value = {err: err.message, user: requester_email, scriptName:scriptName};
        axios.post(configData.SERVER_URL + "/api/logToDB", value);
      } 
    });
    await XLSX.fromFileAsync(_dir + vFileName)
      .then((workbook) => {
        var excelValues = workbook.sheet("Sheet1").usedRange().value();
        var rowCount = 1;
        var filepath = _dir + vFileName;
        async function get_data(workbook, filepath) {
          for (var i = 1; i < excelValues.length; i++) {
            rowCount = rowCount + 1;
            var request_zone = ""
            var request_type = excelValues[i][1];
            var requester_type = excelValues[i][2];
            var new_shipping_point = excelValues[i][3];
            var partner_func =excelValues[i][4];
            var text_change_type = excelValues[i][5];
            var text_change_action =excelValues[i][6];
            var sales_order = excelValues[i][7];
            var new_value = excelValues[i][8];
            var quotation = "";
            var request_reason = excelValues[i][9];
            var additional_Information = excelValues[i][10];
            var additional_notification_to = excelValues[i][11];
            var request_status = 1;
            var StatusFlag = 1;
            var bot_status = "";
            var bot_comments = "";
            var approver="";
            
            console.log(
              
              request_type +
              "," +
              requester_type +
              "," +
              new_shipping_point +
              "," +
              partner_func +
              "," +
              text_change_type+
              "," +
              text_change_action+
              "," +
              sales_order +
              "," +
              request_reason +
              ","+
              additional_Information+
              ","+
              additional_notification_to+
              ","+
              approver
            );
            
            if (request_type == undefined) {
              request_type = "";
            }
            if (requester_type == undefined) {
              requester_type = "";
            }
            if (new_shipping_point == undefined) {
              new_shipping_point = "";
            }
            if (partner_func == undefined) {
              partner_func = "";
            }
            if (text_change_type == undefined) {
              text_change_type = "";
            }
            if (text_change_action == undefined) {
              text_change_action = "";
            }
            if (sales_order == undefined) {
              sales_order = "";
            }
            if (request_reason == undefined) {
              request_reason = "";
            }
            if (additional_notification_to == undefined) {
              additional_notification_to = "";
            }
            if (additional_Information== undefined) {
              additional_Information = "";
            }
            if (new_value== undefined) {
              new_value = "";
            }
            old_value = "";
            
            
            requester_type = requester_type.toLowerCase();
            request_reason = request_reason.toLowerCase();
            request_flow = 3;
            request_type = request_type.toLowerCase();

            let RequestList = [];
            const getRequestType = async () => {
              await axios.get(configData.SERVER_URL + "/api/getRequestType")
                .then(res => {
                    RequestList = res.data;
                })
                .catch(error => {
                    console.log(error.response.data);
                });
              var val = RequestList.find(x => x.label.toLowerCase() === request_type.toLowerCase());
              if (val!== undefined){
                request_type = val.value
              } else{
                request_type = "";
              }
              return(request_type !== "");;
            };

            let requesterList = [];
            const getRequesterType = async () => {
              await axios.get(configData.SERVER_URL + "/api/getRequesterType")
                .then(res => {
                  requesterList = res.data;
                })
                .catch(error => {
                    console.log(error.response.data);
                });
              var val = requesterList.find(x => x.label.toLowerCase() === requester_type.toLowerCase());
              if (val!== undefined){
                requester_type = val.value
              } else{
                requester_type = "";
              }
              return(requester_type !== "");
            };

            let requestReasonList = [];
            const getRequestReason = async () => {
              await axios.get(configData.SERVER_URL + "/api/getRequestReason")
                .then(res => {
                  requestReasonList = res.data;
                })
                .catch(error => {
                    console.log(error.response.data);
                });
              var val = requestReasonList.find(x => x.label.toLowerCase() === request_reason.toLowerCase());
              if (val!== undefined){
                request_reason = val.value
              } else{
                request_reason = "";
              }
              return(request_reason !== "");
            };

            if (await getRequesterType()){

              if (await getRequestReason()){
                
                if (await getRequestType()){

                  if (request_flow === "existing flow") {
                    request_flow = 1;
                  } else if (request_flow === "no flow") {
                    request_flow = 2;
                  }
                  console.log("status:",(/^\d+$/.test(sales_order)));
                  console.log("status:",sales_order.toString().length);
                  console.log(
                      " type:" +
                      request_type +
                      ", shipping point:" +
                      new_shipping_point+
                      ", partner function:" +
                      partner_func +
                      ", text change type:" +
                      text_change_type+
                      ", text change action:" +
                      text_change_action
                  );
                  if(new_value == "" && (request_type!==1 && request_type!==15)){
                    statusMsg = "New Value cannot be blank";
                  } else if(requester_type=="" || request_type ==""||
                  sales_order==""||request_reason==""){
                    statusMsg = "Mandatory Field data missing";
                  }else if(request_type === 13 && partner_func ===""){
                    statusMsg = "Partner Function missing";
                  }else if(request_type === 17 && (text_change_action ==="" || text_change_type === "")){
                    statusMsg = "Text Change Action missing";
                  }else if(sales_order.toString().length !== 8 || !(/^\d+$/.test(sales_order))){
                    statusMsg = "Incorrect Sales Order";
                  }
                  else {
                    console.log("-----------------start "+ rowCount);
                    var statusMsg = "";
                    statusMsg = await new Promise((resolve) => {
                      get_info(
                        connectionString,
                        request_zone,
                        request_type,
                        requester_type,
                        new_shipping_point,
                        partner_func,
                        text_change_type,
                        text_change_action,
                        request_flow,
                        sales_order,
                        old_value,
                        new_value,
                        requester_email,
                        quotation,
                        request_reason,
                        request_status,
                        StatusFlag,
                        bot_status,
                        bot_comments,
                        additional_Information,
                        additional_notification_to,
                        approver,
                        function (result) {
                          console.log(result + "," + rowCount);
                          resolve(result);
                        }
                      );
                    }
                    ); 
                  }
                } else {
                  statusMsg = "Error in request type data";
                }
              } else {
                statusMsg = "Error in Request Reason data.";
              }
            } else {
              if ((requester_type === "") & (request_type === "")) {
                statusMsg = "";
              } else {
                statusMsg = "Error in Requester Type data.";
              }
            }

            workbook
              .sheet(0)
              .cell("M" + rowCount)
              .value(statusMsg);
            console.log("------------------------",statusMsg,"-----------",rowCount);
            if (i==(excelValues.length-1)){

              var sqlquery = "update Request_Upload_status set Upload_Status='Completed' where [File_name]='"+
              vFileName +
              "'";
              sql.query(connectionString, sqlquery, (err, rows) => {
                if (err != null) {
                  console.log(err);
                } 
              });
            }
          }
        }
        get_data(workbook, filepath).then(() => {

          return workbook.toFileAsync(filepath);
        });
      })
      .then(() => {
        res.send(vFileName);
      })
      .catch((err) => {
        console.log(err);
        var sqlquery = "update Request_Upload_status set Upload_Status='Failed' where [File_name]='"+
        vFileName +
              "'";
        sql.query(connectionString, sqlquery, (err, rows) => {
          if (err != null) {
            console.log(err);
          } 
        });
        res.status(500).json({
          success: false,
          error: err.message,
        });
      });
  });
});

router.post("/res", async function (req, res) {
  if (req.body.resFileName !== "") {
    var outputFile = _dir + req.body.resFileName;
    var files = fs.createReadStream(outputFile);

    files.on('error', function(err) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    });
    res.writeHead(200, {
      "Content-disposition": "attachment; filename=Responce.xlsx",
    });
    files.pipe(res);
  }
});

router.post("/status", function (req, res, next) {
  var filename = req.body.outfile;
  console.log("the filename is :" +filename);
  var sqlquery = "Select Upload_Status from Request_Upload_status where [File_name] ='"+
  filename+
  "'";
  sql.query(connectionString, sqlquery, (err, rows) => {
    if (err != null) {
      console.log(err.message);
      var user =  req.get('User');
      var scriptName = path.basename(__filename);
      var value = {err: err.message, user: user, scriptName:scriptName};
      axios.post(configData.SERVER_URL + "/api/logToDB", value);
      res.status(400).json(err.message)
    } else{
      console.log(rows);
      res.json(rows);
    }
  });
});
module.exports = router;
