'use strict';

require('promise.prototype.finally');

//process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var app      = require('../../app');
var config   = app.locals;
var expect   = require('expect.js');
var request  = require('supertest-session');
var testUtil = require('../util.js');

describe('authentication', function () {

    before('apply migrations', function() {
        var models = require('../../models');

        var sampleUser = {
            username: 'johndoe',
            password: '123456'
        };
        this.sampleUser = sampleUser;

        this.registerSampleUserForTests = function() {
            return new Promise(function(resolve, reject) {
                models.User.register(models.User.build({ username: sampleUser.username }), sampleUser.password, function (err, user) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
            });
        };

        this.clearSampleUserForTests = function() {
            return models.User.findOne({ where: { username: sampleUser.username } }).then(function(user) {
                if ( ! user) {
                    return;
                }
                return user.destroy({ force: true });
            });
        };

        this.validHtmlContentType = new RegExp('^text\/html(?:; charset\=utf\-8)?$');

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

    it('shows a login page', function () {
        var validHtmlContentType = this.validHtmlContentType;
        return new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .get(config.paths.loginPage)
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

    it('authenticates a user', function () {
        var sampleUser = this.sampleUser;
        return this.registerSampleUserForTests().then(function ensureThatLoginPageOpens() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .get(config.paths.loginPage)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function ensureThatLoginWorks(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(302)
                    .expect('Location', config.paths.redirectAfterLogin)
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(this.clearSampleUserForTests);
    });

    it('after authentication it redirects back to page where user intended to go', function () {
        var sampleUser = this.sampleUser;
        var intendedPage = '/profile';
        return this.registerSampleUserForTests().then(function ensureThatUserGetsRedirectedToLoginPageThenTryingToAccessSecuredPage() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .get(intendedPage)
                    .expect(302)
                    .expect('Location', config.paths.loginPage)
                    .end(function(err, res) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function ensureThatReturnToIsSetInUsersSession(agent) {
            var signature = require('cookie-signature');
            var querystring = require('querystring');

            var sessionCookie;
            for(var i = 0; i < agent.cookies.length; ++i) {
                var cookie = agent.cookies[i];
                if (cookie.name == app.locals.session.cookieName) {
                    sessionCookie = cookie.value;
                    break;
                }
            }
            expect(sessionCookie).to.be.an('string');
            sessionCookie = querystring.unescape(sessionCookie);
            expect(sessionCookie.substr(0, 2)).to.be('s:');
            var signedSessionId = sessionCookie.slice(2);
            var secrets = app.locals.session.secret;
            if ( ! Array.isArray(secrets)) {
                secrets = [secrets];
            }
            var sessionId = false;
            for (var i = 0; i < secrets.length; i++) {
                sessionId = signature.unsign(signedSessionId, secrets[i]);
                if (false !== sessionId) {
                    break;
                }
            }
            expect(sessionId).to.be.ok();

            return new Promise(function(resolve, reject) {
                app.locals.session.store.get(sessionId, function(err, session) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    expect(session.returnTo).to.be(intendedPage);
                    resolve(agent);
                });
            });
        }).then(function ensureThatUserGetsRedirectedBackToIntendedSecuredPage(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(302)
                    .expect('Location', intendedPage)
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(this.clearSampleUserForTests);
    });

    it('shows error on bad username', function () {
        var sampleUser = this.sampleUser;
        var wrongUser = {
            username: 'janedoe',
            password: sampleUser.password
        };
        expect(wrongUser.username).not.to.be(sampleUser.username);
        expect(wrongUser.password).to.be(sampleUser.password);
        return new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .post(config.paths.loginPage)
                .type('form')
                .send({
                    username: wrongUser.username,
                    password: wrongUser.password
                })
                .expect(400)
                .expect(new RegExp('Invalid username or password'))
                .end(function(err/*, res */) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    });

    it('shows error on bad password', function () {
        var sampleUser = this.sampleUser;
        var wrongUser = {
            username: sampleUser.username,
            password: 'abcdef'
        };
        expect(wrongUser.username).to.be(sampleUser.username);
        expect(wrongUser.password).not.to.be(sampleUser.password);
        var validHtmlContentType = this.validHtmlContentType;
        return this.registerSampleUserForTests().then(function() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: wrongUser.username,
                        password: wrongUser.password
                    })
                    .expect(400)
                    .expect('Content-Type', validHtmlContentType)
                    .expect(new RegExp('Invalid username or password'))
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(this.clearSampleUserForTests);
    });

    it('logouts a user', function () {
        var sampleUser = this.sampleUser;
        return this.registerSampleUserForTests().then(function ensureThatLoginPageOpens() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .get(config.paths.loginPage)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function ensureThatLoginWorks(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(302)
                    .expect('Location', config.paths.redirectAfterLogin)
                    .end(function(err, res) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function ensureThatLogoutWorks(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .get(config.paths.logout)
                    .expect(302)
                    .expect('Location', '/')
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(this.clearSampleUserForTests);
    });

    it('registers a user', function () {
        var sampleUser = this.sampleUser;
        return (new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .get(config.paths.registrationPage)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(agent);
                });
        })).then(function(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.registrationPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(302)
                    .expect('Location', config.paths.redirectAfterLogin)
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).then(this.clearSampleUserForTests);
    });

    it('shows errors on system issues', function () {
        var sampleUser = this.sampleUser;
        var validHtmlContentType = this.validHtmlContentType;
        var models = require('../../models');
        var undoIssues = function noop() {};
        // TODO: We imitiate issues by undoing migrations, maybe better solution exists?
        return testUtil.getMigrator(models).then(function makeIssues(migrator) {
            return migrator.down().then(function() {
                undoIssues = function() {
                    return migrator.up();
                };
            });
        }).then(function ensureThatLoginIsBroken() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(500)
                    .expect('Content-Type', validHtmlContentType)
                    .expect(new RegExp('Error', 'i'))
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function ensureThatRegistrationIsBroken(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.registrationPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(500)
                    .expect('Content-Type', validHtmlContentType)
                    .expect(new RegExp('Error', 'i'))
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(function() {
            return undoIssues();
        });
    });

    it('shows errors on fatal error when user tries to registers', function () {
        // TODO: Monkey patching is not good, maybe better solution exists?
        var passportLocalStrategy = require('passport')._strategies['local'];
        var originalPassportLocalAuthenticate = passportLocalStrategy.authenticate;
        passportLocalStrategy.authenticate = function(/*req, options*/) {
            this.error(new Error('Fatal error'));
        };
        var sampleUser = this.sampleUser;

        return (new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .post(config.paths.registrationPage)
                .type('form')
                .send({
                    username: sampleUser.username,
                    password: sampleUser.password
                })
                .expect(500)
                .end(function(err/*, res */) {
                    passportLocalStrategy.authenticate = originalPassportLocalAuthenticate;
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        })).then(this.clearSampleUserForTests);
    });

    it('shows errors if a user already registered', function () {
        var sampleUser = this.sampleUser;
        return (new Promise(function(resolve, reject) {
            var agent = request(app);
            agent
                .post(config.paths.registrationPage)
                .type('form')
                .send({
                    username: sampleUser.username,
                    password: sampleUser.password
                })
                .expect(302)
                .end(function(err/*, res */) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(agent);
                });
        })).then(function(agent) {
            agent.destroy();
            return new Promise(function(resolve, reject) {
                agent
                    .post(config.paths.registrationPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(400)
                    .expect('Content-Type', new RegExp('^text\/html'))
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(this.clearSampleUserForTests);
    });

    // TODO: move this test to authenticated.test.js
    it('shows profile page', function () {
        var sampleUser = this.sampleUser;
        return this.registerSampleUserForTests().then(function getAuthenticated() {
            return new Promise(function(resolve, reject) {
                var agent = request(app);
                agent
                    .post(config.paths.loginPage)
                    .type('form')
                    .send({
                        username: sampleUser.username,
                        password: sampleUser.password
                    })
                    .expect(302)
                    .expect('Location', config.paths.redirectAfterLogin)
                    .end(function(err, res) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(agent);
                    });
            });
        }).then(function(agent) {
            return new Promise(function(resolve, reject) {
                agent
                    .get('/profile')
                    .expect(200)
                    .expect('Content-Type', new RegExp('^text\/html'))
                    .end(function(err/*, res */) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
            });
        }).finally(this.clearSampleUserForTests);
    });

});
