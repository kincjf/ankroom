import {Component, OnInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http } from '@angular/http'
import { contentHeaders } from '../../common/headers';


const template = require('./mainPage.html');

@Component({
  selector: 'mainPage',
  template: template,
  directives: [ ROUTER_DIRECTIVES ]
})

export class MainPage {
  jwt: string;
  public data;
  pageSize: number;
  pageStartIndex: number;
  returnedDatas = [];

  constructor(public router: Router, public http: Http) {

    this.pageSize = 6;
    this.pageStartIndex=0;

    this.http.get('http://localhost:3001/api/build-case?pageSize=' + this.pageSize +'&pageStartIndex=' + this.pageStartIndex, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가
          console.log(this.data);
           //for of문으로 for~of 루프구문은 배열의 요소들, data 순회하기 위한구문
          for(var buildCaseInfo of response.buildCaseInfo) {

           //returnDatas에 bizUser의 정보를 date 순환구문
            this.returnedDatas.push({
              memberIdx: buildCaseInfo.memberIdx,
              companyName: buildCaseInfo.companyName,
              aboutCompanyShort: buildCaseInfo.aboutCompanyShort
            });
          }
          this.router.navigate(['/buildcasecase']);

          console.log(this.returnedDatas);

          //this.aboutCompanyShort = this.data.aboutCompanyShort;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )



  }
}
