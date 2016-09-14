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
  private router: Router;

  jwt: string;
  public data;
   pageSize: number;
   pageStartIndex: number;
   returnedDatas = [];

   constructor(public router: Router, public http: Http) {

   this.pageSize = 6;
   this.pageStartIndex=0;

   this.http.get('http://localhost:3001/api/build-case?pageSize=' + this.pageSize +'&pageStartIndex=' + this.pageStartIndex, {headers: contentHeaders}) //서버로부터 필요한 값 받아오기
       .map(res => res.json())//받아온 값을 json형식으로 변경
       .subscribe(
         response => {
           console.log(response);
           //for of문으로 for~of 루프구문은 배열의 요소들, data 순회하기 위한구문
           for(var buildCaseInfo of response.buildCaseInfo) {

             this.returnedDatas.push(buildCaseInfo);

             // this.returnedDatas.push({
             //   memberIdx: buildCaseInfo.memberIdx,
             //   companyName: buildCaseInfo.companyName,
             //   aboutCompanyShort: buildCaseInfo.aboutCompanyShort
             // });
           }

          console.log(this.returnedDatas);
         },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )
  }
  // onSelectBizList(bizUser: bizUserInfo): void {
  //   this.selectedmemberIdx = bizUser;//bizUser는 클릭한 업체의 정보를 가지고 있고 이 정보를 selectedmemberIdx로 옮겼다.
  //   localStorage.setItem('bizUserDetail',bizUser.memberIdx);
  //   console.log(this.selectedmemberIdx);
    // console.log(bizUser.memberIdx);
    // console.log(localStorage.getItem('bizUserDetail'));
    // this.router.navigate(['/listDetailInfo']);
    // 서버로부터 응답 성공시 home으로 이동
}
