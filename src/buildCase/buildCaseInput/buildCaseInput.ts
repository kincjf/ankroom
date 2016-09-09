import { Component,ElementRef,NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

declare var jQuery: JQueryStatic;
const template = require('./buildCaseInput.html');
const URL = 'http://localhost:3001/api/build-case';
const imageURL = 'http://localhost:3001/api/public/image/test';

@Component({
  selector: 'buildCaseInput',
  directives: [FILE_UPLOAD_DIRECTIVES,CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass, NgStyle ],
  template: template
})
export class BuildCaseInput {

  jwt:string;
  public decodedJwt;
  public data;
  memberType: string;



  constructor(public router: Router, public http: Http, private el:ElementRef) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    this.memberType = this.decodedJwt.memberType;
    contentHeaders.append('Authorization', this.jwt);//Header에 jwt값 추가하기
  }


  addBuildCase(event, title, buildType, buildPlace, buildTotalArea, buildTotalPrice) {
    event.preventDefault();

    var confirmMemberType = "2"; // 2:사업주
    var HTMLText = jQuery(this.el.nativeElement).find('.summernote').summernote('code');// 섬머노트 이미지 업로드는 추후에 변경예정
    var VRImages = "test";

    if (this.memberType != confirmMemberType) {
      alert("시공사례 입력은 사업주만 가능합니다");
    }//사업주 인지 점검
    else {
      let body = JSON.stringify({title, buildType, buildPlace, buildTotalArea, buildTotalPrice, HTMLText});
      //html받은 값들을 json형식으로 저장


      this.uploader.uploadAll();
      this.uploader.onCompleteAll = function(){
        this.showUploadLayer = false;
        console.log("onCompleteAll");  // this one get called correctly.
      };

/*
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
*/
    }
  }

  public uploader:FileUploader = new FileUploader({
    url: imageURL,
    headers: contentHeaders,
    itemAlias: 'editorImage'
  });


}

