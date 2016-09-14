'use strict';

var expect = require('expect.js-extra');
var path = require('path');

describe('modules/convert-vrpano', function () {
    it('creates a vrpano tour', function () {
      var vrpano = require('../../modules/convert-vrpano-promise');
      var currentPath = process.cwd();

      var imagePaths = [
        path.join(currentPath, './tests/images/testVRImage1.jpg'),
        path.join(currentPath, './tests/images/testVRImage2.jpg'),
        path.join(currentPath, './tests/images/testVRImage3.jpg')];

      setTimeOut(() => {
        var promise = vrpano(imagePaths);
      }, 10000);   // 1000ms * 10minute

      return expect(promise).to.be(0);
    });
  });

