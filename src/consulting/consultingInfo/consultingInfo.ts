/**
 * Created by insu on 2016-08-29.
 */
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./consultingInfo.html');

@Component({
  selector: 'consultingInfo',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class ConsultingInfo {
  jwt:string;
  public data;
  pageSize: number;
  pageStartIndex: number;

  returnedDatas = [];

  //생성자에서 페이지가 만들어질때 컨설팅 정보목록을 불러온다.
  constructor(public router: Router, public http: Http) {

    //컨설팅 정보의 개수와, 시작 index
    this.pageSize =10;
    this.pageStartIndex=0;

    this.http.get('http://localhost:3001/api/consult?pageSize='+this.pageSize+'&pageStartIndex='+this.pageStartIndex, {headers:contentHeaders})
      .map(res => res.json())//받아온값을 json형식으로 변경
      //cannot get /api/consult?pageSize=10&amp;pageStartIndex=0
      .subscribe(
        response => {
          this.data=response;
          console.log(this.data);

          //for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          for(var consulting of response.Consult) {
            //console.log(response);
            console.log(consulting.idx);
            //localStorage.setItem('consultingDetail',consulting.idx);
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            this.returnedDatas.push({
              idx: consulting.idx,
              title: consulting.title
              //접수현황
              //작성일
            });
          }

          console.log(this.returnedDatas);
        },
        error=>{
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      )
  }

  onSelectConsultingInfo(consulting: Consult): void {
    localStorage.setItem('consultingDetail',consulting.idx);
    //console.log(this.selectedmemberIdx);
    console.log(consulting.idx);
    console.log(localStorage.getItem('consultingDetail'));
    //this.router.navigate(['/listDetailInfo']);
    //서버로부터 응답 성공시 home으로 이동
  }

}

