import { Component,ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import {MultipartItem} from "../../common/multipart-upload/multipart-item";
import {MultipartUploader} from "../../common/multipart-upload/multipart-uploader";
import { config } from '../../common/config';

import { EditorImageUploader } from "../../common/editor-image-uploader";

declare var jQuery: JQueryStatic;
const template = require('./buildCaseInput.html');
const jwt_decode = require('jwt-decode');

@Component({
  selector: 'buildCaseInput',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

export class BuildCaseInput {

  jwt:string;
  public decodedJwt: any;
  public data: any;
  memberType: string;
  confirmMemberType: string;
  inputBuildTypes = [
    {name: '주거공간'},
    {name: '상업공간'},
    {name: '기타'}
  ];

  private uploader:MultipartUploader;
  multipartItem:MultipartItem;
  private vrImage: File;
  private previewImage: File;

  constructor(public router: Router, public http: Http, private el:ElementRef) {
  }

  addBuildCase(event, title, inputBuildType, buildPlace, buildTotalArea, buildTotalPrice) {
    var HTMLText = jQuery(this.el.nativeElement).find('.summernote').summernote('code');// 섬머노트 이미지 업로드는 추후에 변경예정
//    var vrImage = jQuery(this.el.nativeElement).find("input[name=vrImage]")[0].files[0];
//    var previewImage = jQuery(this.el.nativeElement).find("input[name=previewImage]")[0].files[0];

    //파일 업로더를 위한 설정 값들 선언
    this.multipartItem.headers = contentHeaders;
    this.multipartItem.withCredentials = false;
    this.uploader.authToken = this.jwt;


    if (this.memberType != this.confirmMemberType) {
      alert("시공사례 입력은 사업주만 가능합니다");
    }//사업주 인지 점검
    else {
      if (this.multipartItem == null){
        this.multipartItem = new MultipartItem(this.uploader);
      }
      if (this.multipartItem.formData == null)
        this.multipartItem.formData = new FormData();

      this.multipartItem.formData.append("title", title );
      this.multipartItem.formData.append("buildType", inputBuildType );
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
          console.debug("home.ts & uploadCallback() upload file success.")
          this.router.navigate(['/buildcaselist']); //서버에서 삭제가 성공적으로 완료 되면 시공사례 조회로 이동
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
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.confirmMemberType = "2"; //사업주가 접속 했는지 확인 하기위한 값, 2:사업주

    if (!this.jwt) { //로그인을 했는지 점검
      alert("로그인이 필요합니다.");
      this.router.navigate(['/login']);
      return;
    } else {
      if (this.memberType != this.confirmMemberType) { //사업주 인지 점검
        alert("시공사례 입력은 사업주만 가능합니다");
      } else {
        this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
        let URL = [config.serverHost, config.path.buildCase].join('/');

        this.uploader = new MultipartUploader({url: URL});
        this.multipartItem = new MultipartItem(this.uploader);
        this.multipartItem.formData = new FormData();

        this.memberType = this.decodedJwt.memberType;
        // viewChild is set after the view has been initialized
        jQuery(this.el.nativeElement).find('.summernote').summernote({
          height: 600,                 // set editor height
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
  }
}

