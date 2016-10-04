import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./change.html');
const jwt_decode = require('jwt-decode');

@Component({
  selector: 'change',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

/**
 * 회원가입 수정 가이드 페이지
 */
export class Change {
  jwt:string;
  decodedJwt: any;

  constructor(private router: Router, public http: Http) {
  }

  ngOnInit() {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && jwt_decode(this.jwt); //jwt값 decoding
    console.log(contentHeaders.get('Authorization'));
    if (!contentHeaders.get('Authorization')) contentHeaders.append('Authorization',this.jwt); //Header에 jwt값 추가하기

    let URL = [config.serverHost, config.path.changeSignup, this.decodedJwt.idx].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          let memberType = response.user.memberType;

          // 일반회원은 일반회원 수정페이지로 이동
          if (memberType == "1") {
            this.router.navigate(["/normalsignupchange"]);
          }
          // 일반회원또는 사업주회원이 아닐 경우 잘못된 값이므로 홈으로 보낸다.
          else if (memberType != "2") {
            this.router.navigate(["/"]);
          }
          // 사업주회원은 일반회원수정과 사업주회원 수정을
          // 할 수 있으므로 가이드 페이지를 표시한다.
          // else {  }
        },
        error => {
          alert(error.text());
          console.log(error.text());
          // 서버로부터 응답 실패시 경고창
          
          this.router.navigate(["/"]);
          // 가이드 페이지를 알려주지 않고 홈으로 보냄
        }
      );
  }
}
