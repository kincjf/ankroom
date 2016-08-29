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
var headers_1 = require('../../common/headers');
var template = require('./normalSignup.html');
var NormalSignup = (function () {
    function NormalSignup(router, http) {
        this.router = router;
        this.http = http;
    }
    NormalSignup.prototype.normalsignup = function (event, email, password, password_ok, telephone, memberType) {
        var _this = this;
        //html에서의 value값
        var passwords = password;
        var confirmpasswords = password_ok;
        console.log(memberType);
        if (passwords != confirmpasswords) {
            alert("비밀번호가 일치하지 않습니다");
        } //password 일치하는지 점검
        else {
            event.preventDefault();
            var body = JSON.stringify({ email: email, password: password, telephone: telephone, memberType: memberType });
            //html받은 값들을 json형식으로 저장
            this.http.post('http://localhost:3001/api/auth/register', body, { headers: headers_1.contentHeaders })
                .subscribe(function (response) {
                _this.router.navigate(['/login']);
                //서버로부터 응답 성공시 home으로 이동
            }, function (error) {
                alert(error.text());
                console.log(error.text());
                //서버로부터 응답 실패시 경고창
            });
        }
    };
    NormalSignup = __decorate([
        core_1.Component({
            selector: 'normalSignup',
            directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
            template: template
        })
    ], NormalSignup);
    return NormalSignup;
}());
exports.NormalSignup = NormalSignup;
//# sourceMappingURL=normalSignup.js.map