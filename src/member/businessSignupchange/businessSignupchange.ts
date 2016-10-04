import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./businessSignupchange.html');
const jwt_decode = require('jwt-decode');

@Component({
  selector: 'businessSignupchange',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

export class BusinessSignupChange {
  jwt:string;
  decodedJwt: any;
  public data;
  contacts:string;
  companyNames:string;
  ownerNames:string;
  bizRegNos:string;
  workPlaces:string;
  mainWorkFields:string;
  mailWorkAreas:string;

  // class member init
  constructor(public router: Router, public http: Http) {
  }

  // member data init
  ngOnInit() {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && jwt_decode(this.jwt); //jwt값 decoding
    if (!contentHeaders.get('Authorization')) contentHeaders.append('Authorization',this.jwt); //Header에 jwt값 추가하기

    let URL = [config.serverHost, config.path.changeBizSignup, this.decodedJwt.idx].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json()) //받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
          this.contacts = this.data.bizUserInfo.contact;
          this.companyNames = this.data.bizUserInfo.companyName;
          this.ownerNames = this.data.bizUserInfo.ownerName;
          this.bizRegNos = this.data.bizUserInfo.bizRegNo;
          this.workPlaces = this.data.bizUserInfo.workPlace;
          this.mainWorkFields = this.data.bizUserInfo.mainWorkField;
          this.mailWorkAreas = this.data.bizUserInfo.mailWorkArea;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }

  businesssignupchange(event, contact, companyName, ownerName, bizRegNo, workPlace, mainWorkField, mailWorkArea, memberType) {
    //html에서의 value값

      event.preventDefault();
      let body = JSON.stringify({ contact, companyName, ownerName, bizRegNo, workPlace, mainWorkField, mailWorkArea, memberType });
      //html받은 값들을 json형식으로 저장

      let URL = [config.serverHost, config.path.changeBizSignup, this.decodedJwt.idx].join('/');

      this.http.put(URL, body, { headers: contentHeaders })
        .subscribe(
          response => {
            this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
            if (contentHeaders.get('Authorization')) {
              contentHeaders.delete('Authorization');//기존에 jwt값을 지우기 위해 실행
              contentHeaders.append('Authorization',this.jwt);
            }
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

  cancel(){
    contentHeaders.delete('Authorization');//기존에 jwt값을 지우기 위해 실행
  }
}
