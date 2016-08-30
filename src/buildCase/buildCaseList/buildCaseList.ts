import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http,Headers } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./buildCaseList.html');

@Component({
  selector: 'buildCaseList',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})


export class BuildCaseList {
  jwt:string;
  decodedJwt: string;
  public data;
  pageSize: number;
  pageStartIndex: number;
  email: string;


  constructor(public router: Router, public http: Http) {

    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기

    this.http.get('http://localhost:3001/api/build-case?pageSize={' + this.pageSize + '}'+'&pageStartIndex={' + this.pageStartIndex + '}', {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
          this.email = this.data.user.email;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }

}
