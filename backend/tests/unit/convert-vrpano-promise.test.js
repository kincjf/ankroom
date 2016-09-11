'use strict';

var expect = require('expect.js-extra');
var path = require('path');

describe('modules/convert-vrpano', function () {
  it('creates a vrpano tour', function (done) {
    var vrpano = require('../../modules/convert-vrpano-promise');
    var currentPath = process.cwd();

    var imagePaths = [
      path.join(currentPath, './tests/images/testVRImage1.jpg'),
      path.join(currentPath, './tests/images/testVRImage2.jpg'),
      path.join(currentPath, './tests/images/testVRImage3.jpg')];

    var promise = vrpano(imagePaths);
    this.timeout(10000);      // 1000ms * 10minute

    return promise.then(function(result) {
      console.log("result $j : " + ${result});
      expect(result).to.be.ok();
    });
  });
});
