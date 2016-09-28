/**
 * Created by InSuJeong on 2016-09-13.
 */
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http,Headers } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import * as _ from 'lodash';
import { config } from '../../common/config';

const template = require('./consultingchange.html');

@Component({
  selector: 'consultingChange',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})


export class ConsultingChange {
  jwt:string;
  decodedJwt: string;
  public data: any;
  idx: number;
  currentTitle: string;
  currentPrefBizMemberIdx: number;
  currentUserName: string;
  currentTelephone: string;
  currentEmail: string;
  currentBuildType: string;
  currentBuildPlace: string;
  currentLived: number;
  currentExpectBuildTotalArea: number;
  currentExpectBuildPrice: number;
  currentExpectConsultDate: Date;
  currentExpectBuildStartDate: Date;
  currentReqContents: string;

  consulting: number;

  constructor(public router: Router, public http: Http) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기

    this.consulting = _.toNumber(localStorage.getItem('consultingDetail'));
    let URL = [config.serverHost, config.path.changeSignup, this.consulting].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가

          this.idx = this.data.consult.idx;

          //email을 id부분과 domain부분으로 나누기
          var splitEmail = (this.data.consult.email).split('@');

          //현재 수정할 정보를 불러오기
          this.currentTitle = this.data.consult.title;
          this.currentPrefBizMemberIdx = this.data.consult.prefBizMemberIdx;
          this.currentUserName = this.data.consult.userName;
          this.currentTelephone = this.data.consult.telephone;
          this.currentEmail = splitEmail[0];
          this.currentBuildType = this.data.consult.buildType;
          this.currentBuildPlace = this.data.consult.buildPlace;
          this.currentLived = this.data.consult.lived;
          this.currentExpectBuildTotalArea = this.data.consult.expectBuildTotalArea;
          this.currentExpectBuildPrice = this.data.consult.expectBuildPrice;
          this.currentExpectConsultDate = this.data.consult.expectConsultDate;
          this.currentExpectBuildStartDate = this.data.consult.expectBuildStartDate;
          this.currentReqContents = this.data.consult.reqContents;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }


  consultingchanging(event, title, buildType, userName, telephone, email, domain, expectBuildPrice, buildPlace, expectBuildTotalArea, expectBuildStartDate, expectConsultDate, reqContents){
    event.preventDefault();
    //lived에 들어갈 radio버튼에서 체크된 값 가져오기
    var lived 		= $(':radio[name="optionsRadios"]:checked').val();
    //email을 id부분과 domain합치기
    email = email + '@' + domain;
    //html받은 값들을 json형식으로 저장
    let body= JSON.stringify({title, buildType, userName, telephone, email, expectBuildPrice, buildPlace, lived, expectBuildTotalArea, expectBuildStartDate, expectConsultDate, reqContents});

    let URL = [config.serverHost, config.path.consulting, this.consulting].join('/');

    this.http.put(URL, body, {headers: contentHeaders})
      .subscribe(
        response => {
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
  /*
  check() {
    if(lived == '0')
      document.getElementById("radio-residence").checked = true;
    else(lived == '1')
      document.getElementById("radio-nonresidence").checked=true;
  }
  */
}
