var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cors = require("cors");
const sql = require("msnodesqlv8");
const conStr = require("./config/keys");
const passport = require("passport");


const allDataRouter = require("./Routes/getDataFromDB");
const uploadData = require("./routes/uploadData");
var uploadExcel= require("./routes/uploadFiles");
var changeReqStatus = require("./routes/updateRequestStatus");
var exportFile = require("./routes/DuwnloadExcel");
var filterData = require("./routes/filterData");
var getPlant = require("./routes/getPlant");
var getShippingPoint = require("./routes/getShippingPoint");
var updateCell = require("./routes/updateCell");
var filterMultipleSO = require("./routes/filterMultipleSO");
var updateRole = require("./routes/updateRole");
var getUserRole = require("./routes/getUserRole");
var getUserList = require("./routes/getUserList");
var getRequestType = require("./routes/getRequestType");
var getBuyco = require("./routes/getBuyco");
var getPortDoor = require("./routes/getPortDoor");
var getRequestReason = require("./routes/getRequestReason");
var getZone = require("./routes/getZone");
var getRequesterType = require("./routes/getRequesterType");
var logToDB = require("./routes/logToDB");
var getPartnerFunc = require("./routes/getPartnerFunction");
var getTextType = require("./routes/getTextType");
var getTruckTrailer = require("./routes/getTruckTrailer");

const { Console } = require("console");
var cors = require('cors');
var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

app.use("/api/", allDataRouter);
app.use("/api/add/", uploadData);
app.use("/api/upload/", uploadExcel);
app.use("/api/update/", changeReqStatus);
app.use("/exportTemp", exportFile);
app.use("/api/filterData/", filterData);
app.use("/api/getPlant", getPlant);
app.use("/api/getShippingPoint", getShippingPoint);
app.use("/api/updateCell", updateCell);
app.use("/api/filterMultipleSO", filterMultipleSO);
app.use("/api/updateRole", updateRole);
app.use("/api/getUserRole", getUserRole);
app.use("/api/userlist", getUserList);
app.use("/api/getRequestType", getRequestType);
app.use("/api/getBuyco", getBuyco);
app.use("/api/getPortDoor", getPortDoor);
app.use("/api/getRequesterType", getRequesterType);
app.use("/api/getRequestReason", getRequestReason);
app.use("/api/getZone", getZone);
app.use("/api/logToDB", logToDB);
app.use("/api/getPartnerFunc", getPartnerFunc);
app.use("/api/getTextType", getTextType);
app.use("/api/getTruckTrailer", getTruckTrailer);

const connectionString = conStr.connectionStringForDb;
const query = "SELECT top 1 request_type FROM Request_Details";

sql.query(connectionString, query, (err, rows) => {
  if (err != null) {
    console.log(err);
  } else {
    console.log("DB Connected");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
