"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var styles = require('./home.css');
var template = require('./home.html');
var Home = (function () {
    function Home(router, http, authHttp) {
        this.router = router;
        this.http = http;
        this.authHttp = authHttp;
        this.jwt = localStorage.getItem('id_token');
        this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
    }
    Home.prototype.logout = function () {
        localStorage.removeItem('id_token');
        this.router.navigate(['/login']);
    };
    Home.prototype.callAnonymousApi = function () {
        this.router.navigate(['/normalsignupchange']);
    };
    Home.prototype.callSecuredApi = function () {
        this._callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    };
    Home.prototype._callApi = function (type, url) {
        var _this = this;
        this.response = null;
        if (type === 'Anonymous') {
            // For non-protected routes, just use Http
            this.http.get(url)
                .subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = error.text(); });
        }
        if (type === 'Secured') {
            // For protected routes, use AuthHttp
            this.authHttp.get(url)
                .subscribe(function (response) { return _this.response = response.text(); }, function (error) { return _this.response = error.text(); });
        }
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            directives: [common_1.CORE_DIRECTIVES],
            template: template,
            styles: [styles]
        })
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map