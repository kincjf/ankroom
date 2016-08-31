import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

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

    console.log(memberType);

    if (passwords != confirmpasswords) {
      alert("비밀번호가 일치하지 않습니다");
    }//password 일치하는지 점검
    else {
      event.preventDefault();
      let body = JSON.stringify({email, password,  memberType });
      //html받은 값들을 json형식으로 저장
      this.http.post('http://localhost:3001/api/auth/register', body, {headers: contentHeaders})
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
