var express = require("express");
var router = express.Router();
var dateFormat = require("dateformat");
var fs = require("fs");
const tempfile = require("tempfile");
var axios = require("axios");
const configData = require("./config.json");
var path = require('path');

var _dir = "C:/inetpub/wwwroot/OOC/Backend/public/template";
var _dir = "public/template/";
var outFile = _dir + "/template.xlsx";

router.get("/", function (req, res) {
  var files = fs.createReadStream(outFile);
  files.on('error', function(err) {
    console.log(err.message);
    var user =  req.get('User');
    var scriptName = path.basename(__filename);
    var value = {err: err.message, user: user, scriptName:scriptName};
    axios.post(configData.SERVER_URL + "/api/logToDB", value);
    res.status(400).json(err.message)
  });
  res.writeHead(200, {
    "Content-disposition": "attachment; filename=template.xlsx",
  });
   //here you can add more headers
  files.pipe(res);

});


module.exports = router;
