/**
 * Created by KIMSEONHO on 2016-09-02.
 */
//========================================
// Upload Editor Image Route - editor에 작성할 이미지를 서버에 저장함.
//========================================
exports.uploadEditorImage = function(req, res, next) {

  var editorImagePath;

  if (req.files['editorImage']) {
    editorImagePath = [];

    _forEach(req.files['editorImage'], function(file, key) {
      if(file) {
        editorImagePath.push(file.name);
      }
    });
  } else {
    return res.status(400).json({
      errorMsg: 'You must enter an required form field! please check editorImage',
      statusCode: -1
    });
  }

  return res.status(200).json({
    imagePath: editorImagePath,
    statusCode: 1
  });
}
