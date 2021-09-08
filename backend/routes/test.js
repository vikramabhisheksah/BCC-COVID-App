// const configData =  require("./config.json");
// var express = require("express");
// var router = express.Router();
// const sql = require("msnodesqlv8");
// const conStr = require("../config/keys");
// const axios = require('axios');

// let RequestList = "";
// // const sendGetRequest = async (callback) => {
// //     try {
// //         await axios.get(configData.SERVER_URL + "/api/getRequestType")
// //         .then(res => {
// //             // console.log(res.data);
// //             RequestList = res.data;
// //             callback();
// //         })
// //         .catch(error => {
// //             console.log(error);
// //         });
// //     }
// //     catch (err) {
// //         console.error(err);
// //     }

// //     //console.log(Object.values(RequestList).indexOf('Cancellation'));
// //     // console.log (RequestList.find(x => x.label === 'MADx'))
// //     // if (Object.values(RequestList).indexOf('Route') > -1) {
// //     //     console.log('has MAD');
// //     // }
// // };

// const getRequestType = async (callback) => {
//     await axios.get(configData.SERVER_URL + "/api/getRequestType")
//       .then(res => {
//           RequestList = res.data;
//           callback();
//       })
//       .catch(error => {
//           console.log(error);
//       });
//     var val = RequestList.find(x => x.label.toLowerCase() === request_type.toLowerCase());
//     if (val!== undefined){
//       request_type = val.value
      
//     } else{
//       request_type = "";
//     }
//   };


// if(getRequestType(function () {
//     RequestList !== ""}) ){
//         console.log(RequestList)
//     }
// //sendGetRequest();


var test = [];
var f = test.find(x=>x.value==3);
console.log(f);