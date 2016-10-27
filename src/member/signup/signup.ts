import { Component, ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

declare var jQuery: JQueryStatic;
const template = require('./signup.html');
const jwt_decode = require('jwt-decode');

@Component({
  selector: 'signup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class Signup {
  constructor(public router: Router, public http: Http, private el: ElementRef) {
  }
  signup(event, email, password, password_ok) {
    //html에서의 value값
    var passwords = password;
    var confirmpasswords = password_ok;
    var pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    if (!email.match(pattern)) {
      // 이메일 형식 체크
      alert('올바른 이메일을 사용해 주십시오.');
    } else if (passwords.length < 8) {
      // 비밀번호 길이 체크
      alert('비밀번호는 최소 8자리여야 합니다.');
    } else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwords)) {
      // 비밀번호 특수문자 체크
      alert('비밀번호에 특수문자는 사용하실 수 없습니다.');
    } else if (passwords !== confirmpasswords) {
      // password 일치하는지 점검
      alert('비밀번호가 일치하지 않습니다');
    } else {
      // event.preventDefault();
      let memberType = jQuery(this.el.nativeElement).find('#normal-form-member:checked').val();
      // memberType == 1일 경우 일반 사용자
      // 그렇지 않을 경우 사업주 사용자
      if (memberType !== '1') memberType = '2';

      let body = JSON.stringify({ email, password,  memberType });

      let URL = [config.serverHost, config.path.signup].join('/');
      console.log('businessSignup URL : ' + URL);
      // html받은 값들을 json형식으로 저장
      this.http.post(URL, body, { headers: contentHeaders })
        .subscribe(
          response => {
            this.router.navigate(['/login']);
            // 서버로부터 응답 성공시 home으로 이동
          },
          error => {
            alert(error.text());
            console.log(error.text());
            // 서버로부터 응답 실패시 경고창
          }
        );
    }
  }
}
