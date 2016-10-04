import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http,Headers } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./buildCaseList.html');

@Component({
  selector: 'buildCaseList',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

/*
 Component 역할 : 시공사례 글 목록 조회 하기
 작업상황 :
 - 보기 좋게 Grid 배치 및 글자 배치 하기
 차후 개선방안 :
 - 글 10개 단위로 무한 스크롤 적용하기
 */
export class BuildCaseList {
  pageSize: number;
  pageStartIndex: number;
  returnedDatas = [];
  selectedBuildCaseIdx: number;
  serverHost: string;

  constructor(public router: Router, public http: Http) {
  }

  ngAfterViewInit() {
    this.pageSize= 10;
    this.pageStartIndex=0;

    let URL = [config.serverHost, config.path.buildCase + '?pageSize=' + this.pageSize +'&pageStartIndex=' + this.pageStartIndex].join('/');

    //현재 DB에 저장된 시공사례 글을 pageSize와 pageStartIndex를 이용하면 필요 갯수 만큼 가져옴
    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {//for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          this.serverHost = config.serverHost;

          //for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          for (var buildCaseData of response.buildCaseInfo) {
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            this.returnedDatas.push({
              selectedBuildCaseIdx: buildCaseData.idx,
              title: buildCaseData.title,
              mainPreviewImage: buildCaseData.mainPreviewImage,
              HTMLText: buildCaseData.HTMLText
            });
          }
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }
}
