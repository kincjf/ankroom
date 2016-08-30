import { Component,ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

declare var jQuery: JQueryStatic;
const template = require('./buildCaseInput.html');
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'buildCaseInput',
  directives: [ FILE_UPLOAD_DIRECTIVES,CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass, NgStyle ],
  template: template
})
export class BuildCaseInput {

  jwt:string;
  decodedJwt: string;
  public data;
  memberType: string;

  constructor(public router: Router, public http: Http, private el:ElementRef) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization',this.jwt);//Header에 jwt값 추가하기

    this.http.get('http://localhost:3001/api/user/'+this.decodedJwt.idx, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.data=response //해당값이 제대로 넘어오는지 확인후 프론트단에 내용 추가
          this.memberType = this.data.user.memberType;
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }

  addBuildCase(event, title, buildType, buildPlace, buildTotalArea, buildTotalPrice) {
    event.preventDefault();

    var confirmMemberType = "2"; // 2:사업주
    var HTMLText = jQuery(this.el.nativeElement).find('.summernote').summernote('code');
    var VRImages = "test";

    if (this.memberType != confirmMemberType) {
      alert("시공사례 입력은 사업주만 가능합니다");
    }//사업주 인지 점검
    else {
      let body = JSON.stringify({title, buildType, buildPlace, buildTotalArea, buildTotalPrice, HTMLText});
      //html받은 값들을 json형식으로 저장

      this.http.post('http://localhost:3001/api/build-case', body, {headers: contentHeaders})
        .subscribe(
          response => {
            this.router.navigate(['/mainPage']);
            //서버로부터 응답 성공시 mainPage으로 이동
          },
          error => {
            alert(error.text());
            console.log(error.text());
            //서버로부터 응답 실패시 경고창
          }
        );
    }

  }
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}

