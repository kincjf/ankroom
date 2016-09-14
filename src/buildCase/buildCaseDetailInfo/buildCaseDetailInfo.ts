import { Component, ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';

import { contentHeaders } from '../../common/headers';

const template = require('./buildCaseDetailInfo.html');
declare var jQuery: JQueryStatic;

@Component({
  selector: 'buildCaseDetailInfo',
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template
})

export class BuildCaseDetailInfo {
  decodedJwt: string;
  jwt:string;
  public data;
  title:string;
  buildType:string;
  buildPlace:string;
  buildTotalArea:number;
  mainPreviewImage:string;
  buildTotalPrice:number;
  HTMLText:any;
  VRImages:string[];
  buildCaseDetailIdx:string;

  memberIdx: number;
  companyName: string;
  aboutCompany: string;
  mainWorkField: string;
  mainWorkArea: string;
  conmpanyIntroImage: string;

  constructor(public router: Router, public http: Http, private el:ElementRef) {

    this.buildCaseDetailIdx = localStorage.getItem('buildCaseDetailIdx');

    //시공사례조회에서 클릭한 시공사례글에 대한 정보를 가져와서 각 항목별 변수에 저장함
    this.http.get('http://localhost:3001/api/build-case/'+this.buildCaseDetailIdx, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가

          this.title = this.data.buildCaseInfo.title;
          this.buildType = this.data.buildCaseInfo.buildType;
          this.buildPlace = this.data.buildCaseInfo.buildPlace;
          this.buildTotalArea = this.data.buildCaseInfo.buildTotalArea;
          this.mainPreviewImage = this.data.buildCaseInfo.mainPreviewImage;
          this.buildTotalPrice = this.data.buildCaseInfo.buildTotalPrice;
          this.HTMLText = this.data.buildCaseInfo.HTMLText;
          this.VRImages = this.data.buildCaseInfo.VRImages;
          this.memberIdx = this.data.buildCaseInfo.memberIdx;

        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )
  }

  onBizUserInfo() {
    this.http.get('http://localhost:3001/api/biz-store/'+this.memberIdx, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가

          this.companyName = this.data.bizUserInfo.companyName;
          this.aboutCompany = this.data.bizUserInfo.aboutCompany;
          this.mainWorkField = this.data.bizUserInfo.mainWorkField;
          this.mainWorkArea = this.data.bizUserInfo.mainWorkArea;
          this.conmpanyIntroImage = this.data.bizUserInfo.conmpanyIntroImage;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )
  }

}
