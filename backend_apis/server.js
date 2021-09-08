
const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');

const getStateList = require("./routes/getStateList");
const getEthinicityTypes = require("./routes/getEthinicityTypes");
const getRace = require("./routes/getRace");
const getSurveySource = require("./routes/getSurveySource");

var app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/api/getState", getStateList);
app.use("/api/getEthinicityTypes", getEthinicityTypes);
app.use("/api/getRace", getRace);
app.use("/api/getSurveySource", getSurveySource);

app.listen(8000);