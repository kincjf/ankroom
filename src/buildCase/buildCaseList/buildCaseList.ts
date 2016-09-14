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
  pageSize: number;
  pageStartIndex: number;
  returnedDatas = [];
  selectedBuildCaseIdx: number;

  constructor(public router: Router, public http: Http) {

    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기
    this.pageSize= 10;
    this.pageStartIndex=0;

    this.http.get('http://localhost:3001/api/build-case?pageSize=' + this.pageSize +'&pageStartIndex=' + this.pageStartIndex , {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {//for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          //for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          for (var buildCaseData of response.buildCaseInfo) {
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            this.returnedDatas.push({
              selectedBuildCaseIdx: buildCaseData.idx,
              title: buildCaseData.title,
              mainPreviewImage: buildCaseData.mainPreviewImage,
              HTMLText: buildCaseData.HTMLText
            });
            console.log(this.returnedDatas);
          }
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }

  onSelectBuildCaseList(buildCaseData: any): void {
    localStorage.setItem('buildCaseDetailIdx',buildCaseData.selectedBuildCaseIdx);
    //console.log(this.selectedmemberIdx);
    console.log(buildCaseData.idx);
    console.log(localStorage.getItem('buildCaseDetailIdx'));
    //this.router.navigate(['/listDetailInfo']);
    //서버로부터 응답 성공시 home으로 이동
  }

}
