'use strict';

var expect = require('expect.js');
var testUtil = require('../util.js');

describe('models/user', function () {

    before('apply migrations', function() {
        var models = require('../../models');
        return testUtil.getMigrator(models).then(function(migrator) {
            return migrator.up();
        });
    });

    after('undo migrations', function() {
        var models = require('../../models');
        return testUtil.getMigrator(models).then(function(migrator) {
            return migrator.down();
        });
    });

    beforeEach(function () {
        var models = require('../../models');
        this.User = models.User;

        var passportLocalSequelize = require('passport-local-sequelize');
        passportLocalSequelize.attachToUser(this.Member);
    });

    it('creates a user', function () {
        var User = this.Member;
        return (new Promise(function(resolve, reject) {
            User.register(User.build({ username: 'johndoe' }), '123456', function (err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                expect(user.username).to.equal('johndoe');
                resolve(user);
            });
        })).then(function(user) {
            return user.destroy({ force: true });
        });
    });

});
