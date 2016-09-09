/**
 * Created by KIMSEONHO on 2016-09-02.
 */
const multer = require('multer');
const md5 = require('node-md5');
const path = require('path');
const IMAGE_PATH = "./uploads/images";

// Setting file upload to save file
// error 반환(서버 이상시 httpCode = 422, statusCode = 9)
// 수정시 중복체크를 할 수 있도록 fileFilter를 구현하기
var buildCaseInfoStorage = multer.diskStorage({
  // fieldname == vrImage, previewImage
  destination: function (req, file, callback) {
    callback(null, path.join(IMAGE_PATH, 'buildCaseInfo', file.fieldname, Date.now()));
  },
  // 겹치면 Date.now, md5로 감싸자
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var editorImageStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(IMAGE_PATH, 'buildCaseInfo', file.fieldname));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});

/**
 * multer setting 관련
 */
module.exports = {
  buildCaseInfoStorage: buildCaseInfoStorage,
  editorImageStorage: editorImageStorage
}
