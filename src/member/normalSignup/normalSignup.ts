import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./normalSignup.html');

@Component({
  selector: 'normalSignup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class NormalSignup {

  constructor(public router: Router, public http: Http) {
  }

  normalsignup(event, email, password, password_ok, memberType)
  {
    //html에서의 value값
    var passwords = password;
    var confirmpasswords = password_ok;

    if (!email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/)) {
      // 이메일 형식 체크
      alert("올바른 이메일을 사용해 주십시오.");
    }
    else if (passwords.length < 8) {
      // 비밀번호 길이 체크
      alert("비밀번호는 최소 8자리여야 합니다.");
    }
    else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(passwords)) {
      // 비밀번호 특수문자 체크
      alert("비밀번호에 특수문자는 사용하실 수 없습니다.");
    }
    else if (passwords != confirmpasswords) {
      //password 일치하는지 점검
      alert("비밀번호가 일치하지 않습니다");
    }
    else {
      event.preventDefault();
      let body = JSON.stringify({email, password,  memberType });

      let URL = [config.serverHost, config.path.signup].join('/');

      //html받은 값들을 json형식으로 저장
      this.http.post(URL, body, {headers: contentHeaders})
        .subscribe(
          response => {
            this.router.navigate(['/login']);
            //서버로부터 응답 성공시 home으로 이동
          },
          error => {
            alert(error.text());
            console.log(error.text());
            //서버로부터 응답 실패시 경고창
          }
        );

    }
  }


}
