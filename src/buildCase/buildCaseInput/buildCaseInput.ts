import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from '../../../node_modules/ng2-file-upload';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./buildCaseInput.html');
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'buildCaseInput',
  directives: [ FILE_UPLOAD_DIRECTIVES,CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass, NgStyle ],
  template: template
})
export class BuildCaseInput {
  constructor(public router: Router, public http: Http) {
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

  addBuildCase(event, buildName, buildSelect, buildArea, buildLocation, buildCost, buildContent, buildImage)
  {
      event.preventDefault();
      let body = JSON.stringify({buildName, buildSelect, buildArea, buildLocation, buildCost, buildContent, buildImage});
      //html받은 값들을 json형식으로 저장
      this.http.post('http://localhost:3001/api/build-case', body, {headers: contentHeaders})
        .subscribe(
          response => {
            this.router.navigate(['/login']);
            //서버로부터 응답 성공시 home으로 이동
          },
          error => {
            alert(error.text());
            console.log(error.text());
            //서버로부터 응답 실패시 경고창
          }
        );

  }
}

