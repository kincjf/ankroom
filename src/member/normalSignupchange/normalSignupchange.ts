import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./normalSignupchange.html');
const jwt_decode = require('jwt-decode');

@Component({
  selector: 'normalSignupchange',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

/**
 * 일반 회원 정보 변경
 * 문제 -> 취소 버튼 클릭시 submit이 실행됨
 */
export class NormalSignupChange {
  jwt:string;
  decodedJwt: any;
  public data;
  email: string;
  telephones: string;
  type: number;

  constructor(public router: Router, public http: Http) {
  }

  ngOnInit() {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && jwt_decode(this.jwt); //jwt값 decoding
    if (!contentHeaders.get('Authorization')) contentHeaders.append('Authorization',this.jwt); //Header에 jwt값 추가하기

    let URL = [config.serverHost, config.path.changeSignup, this.decodedJwt.idx].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
          this.email = this.data.user.email;
          this.telephones = this.data.user.telephone;
          this.type = this.data.user.memberType;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }


  normalsignupchange(event, email, password, password_ok, telephone, memberType) {
    //html에서의 value값
    var passwords = password;
    var confirmpasswords = password_ok;

    if (passwords != confirmpasswords) {
      alert("비밀번호가 일치하지 않습니다");
    }//password 일치하는지 점검
    else {
      let body = JSON.stringify({email, password, telephone, memberType});
      //html받은 값들을 json형식으로 저장

      let URL = [config.serverHost, config.path.changeSignup, this.decodedJwt.idx].join('/');

      this.http.put(URL, body, {headers: contentHeaders})
        .subscribe(
          response => {
            localStorage.setItem('id_token', response.json().id_token);
            this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
            if (contentHeaders.get('Authorization')) {
              contentHeaders.delete('Authorization');//기존에 jwt값을 지우기 위해 실행
              contentHeaders.append('Authorization',this.jwt);
            }
            this.router.navigate(['/mainPage']);
            //서버로부터 응답 성공시 mainPage으로 이동
          },
          error => {
            alert(error.text());
            console.log(error.text());
            //서버로부터 응답 실패시 경고창

            // 권한이 없으므로 홈으로 이동
            this.router.navigate(['/']);
          }
        );
    }
  }
  
  cancel() {
    contentHeaders.delete('Authorization');//기존에 jwt값을 지우기 위해 실행
  }
}
