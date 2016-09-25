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
  contacts:string;
  companyNames:string;
  ownerNames:string;
  bizRegNos:string;
  workPlaces:string;
  mainWorkFields:string;
  mailWorkAreas:string;

  constructor(public router: Router, public http: Http) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기

    this.http.get('http://localhost:3001/api/user/biz/'+this.decodedJwt.idx, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
          console.log(this.data);
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


      this.http.put('http://localhost:3001/api/user/biz/'+this.decodedJwt.idx, body, { headers: contentHeaders })
        .subscribe(
          response => {
            this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
            contentHeaders.delete('Authorization');//기존에 jwt값을 지우기 위해 실행
            contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기
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
