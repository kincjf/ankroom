/**
 * Created by KIMSEONHO on 2016-09-14.
 */

function getBase64(file, ext) {
  var reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = function () {
    $("#buffer_file").text(reader.result);
    $("#buffer_ext").text(ext);
  };

  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function getExtension(name) {
  var ext = name.substr(name.lastIndexOf('.') + 1);
  return ext.toLowerCase();
}

function isImage(ext) {
  // extension array
  var extension = new Array();
  extension.push("jpg");
  extension.push("png");
  extension.push("gif");

  // compare extension
  if (extension.indexOf(ext) != -1) {
    return true;
  } else {
    return false;
  }
}

/* Image Upload */
function sendFile(files) {
  for(var i = 0; i < files.length; i++) {
    if ($("#buffer_file").text() == "") {
      var ext = getExtension(files[i].name);
      if (isImage(ext) == true) {
        getBase64(files[i], ext); // Insert image data to buffer
      } /* else {
       ; // No image file
       } */
    } else {
      i--;
    }
  }
}

/* Send Image File to Server */
function send() {
  if ($("#buffer_file").text() != "" && ready == false) {
    ready = true;
    // Get image data (base 64)
    var data = {};
    data.file = $("#buffer_file").text();
    data.ext  = $("#buffer_ext").text();

    $.ajax({
      data: data,
      type:"POST",
      url:"http://localhost:3001/api/public/image", // Server URL
      success : function (res) {
        // Clear image buffer
        $("#buffer_file").text("");
        $("#buffer_ext").text("");

        // Add summernote image
        editor.insertImage(res.imagePath);
      }
    });
    ready = false;
  }
}
