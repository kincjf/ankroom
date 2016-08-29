"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var headers_1 = require('../common/headers');
var template = require('./login.html');
var Login = (function () {
    function Login(router, http) {
        this.router = router;
        this.http = http;
    }
    Login.prototype.login = function (event, email, password) {
        var _this = this;
        //html에서의 value값
        event.preventDefault();
        var body = JSON.stringify({ email: email, password: password });
        //html받은 값들을 json형식으로 저장
        this.http.post('http://localhost:3001/api/auth/login', body, { headers: headers_1.contentHeaders })
            .subscribe(function (response) {
            localStorage.setItem('id_token', response.json().id_token);
            _this.router.navigate(['/home']);
            //서버로부터 응답 성공시 home으로 이동
        }, function (error) {
            alert(error.text());
            console.log(error.text());
            //서버로부터 응답 실패시 경고창
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
            template: template
        })
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map