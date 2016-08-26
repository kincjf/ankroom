import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./businessSignupchange.html');

@Component({
  selector: 'businessSignupchange',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class BusinessSignupChange {
  jwt:string;
  decodedJwt: string;
  public data;

  constructor(public router: Router, public http: Http) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorzation',this.jwt);//Header에 jwt값 추가하기

    this.http.get('http://localhost:3001/api/business-user/:'+this.decodedJwt.idx, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }

  businesssignupchange(event, username, password, password_ok, contact, companyName, ownerName, bizRegNo, workPlace, mainWorkField, mailWorkArea, memberType) {
    //html에서의 value값
    var passwords = password;
    var confirmpasswords = password_ok;

    if (passwords != confirmpasswords) {
      alert("비밀번호가 일치하지 않습니다");
    }//password 일치하는지 점검
    else {
      event.preventDefault();
      let body = JSON.stringify({ username, password, contact, companyName, ownerName, bizRegNo, workPlace, mainWorkField, mailWorkArea, memberType });
      //html받은 값들을 json형식으로 저장
      this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
      this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
      contentHeaders.append('Authorzation',this.jwt);//Header에 jwt값 추가하기

      this.http.put('http://localhost:3001/api/auth/register'+this.decodedJwt.idx, body, { headers: contentHeaders })
        .subscribe(
          response => {
            this.router.navigate(['/mainPage']);
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
