'use strict';

var expect = require('expect.js');

describe('config/index', function () {
    
    var originalExpectAssertionPrototype = {
        stringOrArrayOfStrings: expect.Assertion.prototype.stringOrArrayOfStrings,
        pureObject: expect.Assertion.prototype.pureObject
    };
    
    before(function() {
        originalExpectAssertionPrototype.stringOrArrayOfStrings = expect.Assertion.prototype.stringOrArrayOfStrings;
        originalExpectAssertionPrototype.pureObject = expect.Assertion.prototype.pureObject;
        expect.Assertion.prototype.pureObject = function() {
            var ok = 'object' == typeof this.obj && '[object Array]' != Object.prototype.toString.call(this.obj);
            this.assert(ok, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to be a pure object';
            }, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to not be a pure object';
            });
        };
        expect.Assertion.prototype.stringOrArrayOfStrings = function() {
            var ok;
            if ('string' == typeof this.obj) {
                ok = true;
            } else if ('[object Array]' == Object.prototype.toString.call(this.obj)) {
                ok = true;
                for(var i = 0; i < this.obj.length; ++i) {
                    if ('string' != typeof this.obj[i]) {
                        ok = false;
                        break;
                    }
                }
            } else {
                ok = false;
            }
            this.assert(ok, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to be a string or an array of strings';
            }, function() {
                return 'expected ' + expect.stringify(this.obj) + ' to not be a string or an array of strings';
            });
        };
    });
    
    after(function() {
        expect.Assertion.prototype.stringOrArrayOfStrings = originalExpectAssertionPrototype.stringOrArrayOfStrings;
        expect.Assertion.prototype.pureObject = originalExpectAssertionPrototype.pureObject;
    });
    
    it('has proper config', function () {
        var config = require('../../config');
        
        expect(config).to.be.pureObject();
        expect(config.app).to.be.pureObject();
        expect(config.app.name).to.be.a('string');
        expect(config.database).to.be.pureObject();
        expect(config.database.dialect).to.be.a('string');
        expect(config.session).to.be.pureObject();
        expect(config.session.cookieName).to.be.a('string');
        expect(config.session.secret).to.be.stringOrArrayOfStrings();
        expect(config.paths).to.be.pureObject();
    });
});