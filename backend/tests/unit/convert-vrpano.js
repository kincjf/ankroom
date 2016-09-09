'use strict';

var expect = require('expect.js-extra');
var path = require('path');

var vrpano = require('../../modules/convert-vrpano');
var currentPath = process.cwd();

var imagePaths = [
  path.join(currentPath, './tests/images/testVRImage1.jpg'),
  path.join(currentPath, './tests/images/testVRImage2.jpg'),
  path.join(currentPath, './tests/images/testVRImage3.jpg')];
var idx = 1;
vrpano(idx, imagePaths);
