'use strict';

var app      = require('../../app');
var request  = require('supertest-session');

describe('basic functions', function () {

    before(function() {
        this.validHtmlContentType = new RegExp('^text\/html(?:; charset\=utf\-8)?$');
    });

    it('loads correctly', function () {
        var validHtmlContentType = this.validHtmlContentType;
        return new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .get('/')
                .expect(200)
                .expect('Content-Type', validHtmlContentType)
                .end(function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(agent);
                });
        });
    });

    it('handles wrong requests correctly', function () {
        var validHtmlContentType = this.validHtmlContentType;
        return new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .get('/asdfgh')
                .expect(404)
                .expect('Content-Type', validHtmlContentType)
                .end(function(err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(agent);
                });
        });
    });

});
