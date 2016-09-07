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
  var request_dir = "api/public/images/";

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


exports.getImage = function(req, res) {

  var url = req.url;
  var file_name = url.replace("/images/", '');
  var image_dir = "./uploads/images/";

  var image_path = image_dir + file_name;
  var ext = image_path.substr(image_path.lastIndexOf('.') + 1);

  if (fs.existsSync(image_path)) {
    fs.readFile(image_path, function(err, data) {
      if (err) throw err;
      switch (ext) {
        case "jpg":
        case "jpeg":
          var content = 'image/jpeg'; break;
        case "png":
          var content = 'image/png'; break;
        case "gif":
          var content = 'image/gif'; break;
        default:
          var content = 'not';
      }

      if (content == 'not') {
        res.status(404).send('Not image')
      } else {
        res.writeHead(200, { 'Content-Type':  content });
        res.end(data, 'utf-8');
      }
    });
  } else {
    res.status(404).send('Not found');
  }
}
