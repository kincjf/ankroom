/**
 * Created by insu on 2016-09-02.
 */
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, Params } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';

import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

const template = require('./bizListDetail.html');

@Component({
  selector: 'bizListDetail',
  directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template
})

export class BizListDetail {
  decodedJwt: string;
  jwt:string;
  public data;
  public selectedId:number;

  companyName:string;
  aboutCompany:string;
  mainWorkField:string;
  mainWorkArea:string;
  email:string;
  member:string;





  constructor(public router: Router, public http: Http, private route:ActivatedRoute) {


  }

  ngAfterViewInit() {
    this.route.params.forEach((params: Params) => {
      let bizUserIdx = +params['bizUserIdx'];
      this.selectedId = bizUserIdx;
    });

    let URL = [config.serverHost, config.path.bizStore, this.selectedId].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data = response; // 해당값이 제대로 넘어오는지 확인후 프론트단에 내용추가
          this.companyName = this.data.bizUserInfo.companyName;
          this.aboutCompany = this.data.bizUserInfo.aboutCompany;
          this.mainWorkField = this.data.bizUserInfo.mainWorkField;
          this.mainWorkArea = this.data.bizUserInfo.mainWorkArea;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )

  }


}
