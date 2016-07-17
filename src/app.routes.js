"use strict";
var home_1 = require('./home');
var login_1 = require('./login');
var signup_1 = require('./signup');
var auth_guard_1 = require('./common/auth.guard');
exports.routes = [
    { path: '', component: login_1.Login },
    { path: 'login', component: login_1.Login },
    { path: 'signup', component: signup_1.Signup },
    { path: 'home', component: home_1.Home, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: login_1.Login },
];
//# sourceMappingURL=app.routes.js.map