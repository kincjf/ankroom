/**
 * Created by insu on 2016-08-29.
 */
import {Component, AfterViewInit} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import toNumber = require("lodash/toNumber");
import { config } from '../../common/config';

const template = require('./consultingDetail.html');

@Component({
  selector: 'consultingDetail',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

export class ConsultingDetail implements AfterViewInit {
  decodedJwt:string;
  jwt:string;
  public data;

  title:string;
  prefBizMemberIdx:number;
  userName:string;
  telephone:string;
  email:string;
  buildType:string;
  buildPlace:string;
  lived:number;
  expectBuildTotalArea:number;
  expectBuildPrice:number;
  expectConsultDate:Date;
  expectBuildStartDate:Date;
  reqContents:string;
  initWriteDate:string;

  consulting:number;
  //lived의 number값을 string인 거주/비거주로 보여주기 위하여만든 변수
  convertedLived:string;


  constructor(public router:Router, public http:Http) {

  }

  ngAfterViewInit() {
    this.jwt = localStorage.getItem('id_token');//login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization', this.jwt);//Header에 jwt값 추가하기

    this.consulting = toNumber(localStorage.getItem('consultingDetail'));
    let URL = [config.serverHost, config.path.consulting, this.consulting].join('/');

    this.http.get(URL, {headers: contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가

          this.title = this.data.consult.title;
          this.prefBizMemberIdx = this.data.consult.prefBizMemberIdx;
          this.userName = this.data.consult.userName;
          this.telephone = this.data.consult.telephone;
          this.email = this.data.consult.email;
          this.buildType = this.data.consult.buildType;
          this.buildPlace = this.data.consult.buildPlace;
          this.lived = this.data.consult.lived;
          this.expectBuildTotalArea = this.data.consult.expectBuildTotalArea;
          this.expectBuildPrice = this.data.consult.expectBuildPrice;
          this.expectConsultDate = this.data.consult.expectConsultDate;
          this.expectBuildStartDate = this.data.consult.expectBuildStartDate;
          this.reqContents = this.data.consult.reqContents;
          this.initWriteDate = this.data.consult.initWriteDate;
          if (this.lived == 0)
            this.convertedLived = "거주";
          else if (this.lived == 1)
            this.convertedLived = "비거주";
          else
            alert("empty lived");
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )
  }
}
