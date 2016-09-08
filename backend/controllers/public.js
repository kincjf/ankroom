/**
 * Created by KIMSEONHO on 2016-09-02.
 */
//========================================
// Upload Editor Image Route - editor에 작성할 이미지를 서버에 저장함.
//========================================

var sha256 = require('js-sha256');
var fs = require('fs');

exports.uploadEditorImage = function(req, res) {

  var file_name = sha256(req.body.file); // sha256 hash
  var file_ext = req.body.ext;
  var img_dir = "uploads/images/"; // image file directory

  var hostname = "http://localhost:3001/";
  var serverhome = "./";
  var request_dir = "images/";

  var imagePath = hostname + request_dir + file_name + "." + file_ext; // url
  var savePath = serverhome + img_dir + file_name + "." + file_ext;

  var data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
  var buf = new Buffer(data, 'base64');

  fs.writeFile(savePath, buf, function(err) {
    if (err) throw err;
    console.log('File write completed: ' + savePath);
  });

  return res.status(200).json({
    imagePath: imagePath,
    statusCode: 1
  });
}

/**
 * multer 이용 - https://github.com/expressjs/multer
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.uploadTestImage = function(req, res, next) {
  var editorImagePath;

  if (req.files['file']) {
    editorImagePath = [];

    _forEach(req.files['file'], function(file, key) {
      if(file) {
        editorImagePath.push(file.name);
      }
    });
  } else {
    return res.status(400).json({
      errorMsg: 'You must enter an required form field! please check file',
      statusCode: -1
    });
  }

  return res.status(200).json({
    imagePath: editorImagePath,
    statusCode: 1
  });
}
