'use strict';

var expect = require('expect.js');
var extendConfig = require('../../config/util.js').extendConfig;

describe('models/user', function () {

    describe('config/util/extendConfig', function () {
        it('merges configs', function () {
            var first, second, result;
            first = {
                param1: 'abc'
            };
            second = {
                param2: 'def'
            };
            result = extendConfig(first, second);
            
            expect(result).to.be.an('object');
            expect(result.param1).to.be('abc');
            expect(result.param2).to.be('def');
        });
        
        it('throws an error then trying to merge object into scalar', function () {
            var a = {
                param: 'string'
            };
            var b = {
                param: { abc: 123 }
            };
            
            expect(function() { extendConfig(a, b); }).to.throwError();
        });
    });
});
