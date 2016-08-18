'use strict';

var expect = require('expect.js');
var testUtil = require('../util.js');

describe('models/index', function () {
    it('migrates up and down', function() {
        var models = require('../../models');
        return testUtil.getMigrator(models).then(function(migrator) {
            return migrator.up().then(function() {
                return migrator.down();
            });
        });
    });
    
    it('returns the user model', function () {
        var models = require('../../models');
        expect(models.User).to.be.ok();
    });
});