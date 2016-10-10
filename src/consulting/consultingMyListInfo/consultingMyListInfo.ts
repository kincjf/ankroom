/**
 * Created by insu on 2016-08-29.
 */
import {Component} from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';
import * as moment from 'moment';

const template = require('./consultingMyListInfo.html');

@Component({
  selector: 'consultingMyListInfo',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class ConsultingMyListInfo {
  jwt:string;
  decodedJwt: any;
  public data;
  pageSize: number;
  pageStartIndex: number;
  private loginMemberIdx: number;

  returnedDatas = [];

  /*
   Component 역할 : 내 컨설팅 리스트 보기
   작업상황 :
   - 다음 우편 API 사용하여 주소 입력 받기(완료)
   차후 개선방안 :
   - ngIf문을 사용하지 않고 서버에서 가져온 값만 보여주도록 구현
   */

  constructor(public router: Router, public http: Http) {
    this.jwt = localStorage.getItem('id_token');//login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.set('Authorization', this.jwt);//Header에 jwt값 추가하기

    this.loginMemberIdx = this.decodedJwt.idx;

    //컨설팅 정보의 개수와, 시작 index
    this.pageSize =10;
    this.pageStartIndex=0;

    let URL = [config.serverHost, config.path.consulting + "?pageSize=" + this.pageSize + '&pageStartIndex=' + this.pageStartIndex].join('/');

    this.http.get(URL, {headers:contentHeaders})
      .map(res => res.json())//받아온값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response;

          //for of문으로 for–of 루프 구문은 배열의 요소들, 즉 data를 순회하기 위한 구문입니다.
          for(var consulting of response.Consult) {
            //returnDatas에 bizUser의 정보를 data의 수만큼 받아온다.
            this.returnedDatas.push({
              idx: consulting.idx,
              memberIdx: consulting.memberIdx,
              title: consulting.title,
              initWriteDate: moment(consulting.initWriteDate).format('YYYY/MM/DD'),
              userName: consulting.userName,
              buildPlace: JSON.parse(consulting.buildPlace),
              buildType: consulting.buildType
              //접수현황
            });
          }

        },
        error=>{
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      )
  }
}

