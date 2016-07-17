"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var angular2_jwt_1 = require('angular2-jwt');
var auth_guard_1 = require('./common/auth.guard');
var app_1 = require('./app');
var app_routes_1 = require('./app.routes');
platform_browser_dynamic_1.bootstrap(app_1.App, [
    router_1.provideRouter(app_routes_1.routes),
    common_1.FORM_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    angular2_jwt_1.AUTH_PROVIDERS,
    auth_guard_1.AuthGuard
]);
//# sourceMappingURL=index.js.map