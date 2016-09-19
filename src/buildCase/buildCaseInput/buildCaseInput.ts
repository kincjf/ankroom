import { Component,ElementRef,NgZone } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass, NgStyle } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {MultipartItem} from "../../common/multipart-upload/multipart-item";
import {MultipartUploader} from "../../common/multipart-upload/multipart-uploader";

import { EditorImageUploader } from "../../common/editor-image-uploader";

declare var jQuery: JQueryStatic;
const template = require('./buildCaseInput.html');
const URL = 'http://localhost:3001/api/build-case';
const imageURL = 'http://localhost:3001/api/public/image/test';

@Component({
  selector: 'buildCaseInput',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass, NgStyle ],
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
//    contentHeaders.append('Authorization', this.jwt);//Header에 jwt값 추가하기
    this.multipartItem.formData = new FormData();
  }

  private uploader:MultipartUploader = new MultipartUploader({url: URL});
  multipartItem:MultipartItem = new MultipartItem(this.uploader);


  // uploadCallback : (data) => void;

  private vrImage: File;
  private previewImage: File;

  addBuildCase(event, title, buildType, buildPlace, buildTotalArea, buildTotalPrice) {
    event.preventDefault();

    var confirmMemberType = "2"; // 2:사업주
    var HTMLText = jQuery(this.el.nativeElement).find('.summernote').summernote('code');// 섬머노트 이미지 업로드는 추후에 변경예정
//    var vrImage = jQuery(this.el.nativeElement).find("input[name=vrImage]")[0].files[0];
//    var previewImage = jQuery(this.el.nativeElement).find("input[name=previewImage]")[0].files[0];
    this.multipartItem.headers = contentHeaders;
    this.multipartItem.withCredentials = false;
    this.uploader.authToken = this.jwt;


    if (this.memberType != confirmMemberType) {
      alert("시공사례 입력은 사업주만 가능합니다");
    }//사업주 인지 점검
    else {
      if (this.multipartItem == null){
        this.multipartItem = new MultipartItem(this.uploader);
      }
      if (this.multipartItem.formData == null)
        this.multipartItem.formData = new FormData();

      this.multipartItem.formData.append("title", title );
      this.multipartItem.formData.append("buildType", buildType );
      this.multipartItem.formData.append("buildPlace", buildPlace );
      this.multipartItem.formData.append("buildTotalArea", buildTotalArea );
      this.multipartItem.formData.append("buildTotalPrice", buildTotalPrice );
      this.multipartItem.formData.append("HTMLText", HTMLText );
      this.multipartItem.formData.append("previewImage", this.previewImage );

      this.multipartItem.callback = (data) => {
        console.debug("home.ts & uploadCallback() ==>");
        this.vrImage = null;
        this.previewImage = null;
        if (data){
          console.debug("home.ts & uploadCallback() upload file success.");
        }else{
          console.error("home.ts & uploadCallback() upload file false.");
        }
      }

      this.multipartItem.upload();
    }
  }

  selectVRImage($event): void {
    var inputValue = $event.target;
    if( null == inputValue || null == inputValue.files[0]){
      console.debug("Input file error.");
      return;
    }else {

      for(var i = 0; i < inputValue.files.length; i++){
        this.multipartItem.formData.append("vrImage", inputValue.files[i] );
        console.debug("Input File name: " + inputValue.files[i].name + " type:" + inputValue.files[i].size + " size:" + inputValue.files[i].size);
      }

    }
  }

  selectPreviewImage($event): void {
    var inputValue = $event.target;
    if( null == inputValue || null == inputValue.files[0]){
      console.debug("Input file error.");
      return;
    }else {
      this.previewImage = inputValue.files[0];
      console.debug("Input File name: " + this.previewImage.name + " type:" + this.previewImage.size + " size:" + this.previewImage.size);
    }
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    jQuery(this.el.nativeElement).find('.summernote').summernote({
      height: 300,                 // set editor height
      minHeight: null,             // set minimum height of editor
      maxHeight: null,             // set maximum height of editor
      focus: true,
      callbacks: {
        onImageUpload: function (files, editor) {
          EditorImageUploader.getInstance().upload(files, editor);
        }
      }
    });

  }
}

