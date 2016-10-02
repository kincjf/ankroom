/**
 * Created by KIMSEONHO on 2016-09-02.
 */
"use strict";

//========================================
// Upload Editor Image Route - editor에 작성할 이미지를 서버에 저장함.
//========================================

// var sha256 = require('js-sha256');
// var fs = require('fs');
const _ = require('lodash');
const path = require('path');

var env       = process.env.NODE_ENV || "development";
var config    = require("../config/main")[env];

// req.files["fieldname"[i] - structure example
// { fieldname: 'myfile',
//   originalname: '20160224_104138.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: '/tmp/upload/',
//   filename: '8563e0bef6efcc4d709f2d1debb35777',
//   path: '/tmp/upload/8563e0bef6efcc4d709f2d1debb35777',
//   size: 1268337 }

exports.uploadEditorImage = function(req, res, next) {
  let images;

  if (req.files) {
    images = [];

    _(req.files).forEach(file => {
      // let tmpPath = _.replace(file.path, "uploads" + path.sep, "");

      let tmpPath = _.replace(file.path, config.resourcePath + path.sep, "");
      let imagePath = _.split(tmpPath, "\\").join('/');   // request path이기 때문에

      images.push(imagePath);
    });

    return res.status(201).json({
      protocol: req.protocol,
      host: env == "development" ? [config.hostName, config.serverPort].join(":") : config.hostName,
      imagePaths: images,
      statusCode: 1
    });
  } else {
    return res.status(400).json({
      errorMsg: 'You must enter an required form field! please check file field - [editorImage]!',
      statusCode: -1
    });
  }
}



/**
 * multer 이용 - https://github.com/expressjs/multer
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.uploadFileTest = function(req, res, next) {
  var filePath;

  if (req.files) {
    filePath = [];

    _.forEach(req.files, function(file, key) {
      if(file) {
        filePath.push(file.name);
      }
    });
  } else {
    return res.status(400).json({
      errorMsg: 'no file in request',
      statusCode: -1
    });
  }

  return res.status(200).json({
    filePaths: filePath,
    statusCode: 1
  });
}


// exports.uploadEditorImage = function(req, res, next) {
//
//   var file_name = sha256(req.body.file); // sha256 hash
//   var file_ext = req.body.ext;
//   var img_dir = "uploads/images/"; // image file directory
//
//   var hostname = "http://localhost:3001/";
//   var serverhome = "./";
//   var request_dir = "images/";
//
//   var imagePath = hostname + request_dir + file_name + "." + file_ext; // url
//   var savePath = serverhome + img_dir + file_name + "." + file_ext;
//
//   var data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
//   var buf = new Buffer(data, 'base64');
//
//   fs.writeFile(savePath, buf, function(err) {
//     if (err) throw err;
//     console.log('File write completed: ' + savePath);
//   });
//
//   return res.status(200).json({
//     imagePath: imagePath,
//     statusCode: 1
//   });
// }
