import { Component, ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, Params } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Subscription }       from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

declare var jQuery: JQueryStatic;
const template = require('./detail.html');

@Component({
    selector: 'buildCaseDetail',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template
})

export class BuildCaseDetail {
  jwt:string;
  public decodedJwt;
  public selectedId:number;

  public data;
  title:string;
  buildType:string;
  buildPlace:string;
  buildTotalArea:number;
  mainPreviewImage:string;
  buildTotalPrice:number;
  HTMLText:any;
  VRImages: any;
  buildCaseDetailIdx:string;

  memberIdx: number;
  companyName: string;
  aboutCompany: string;
  mainWorkField: string;
  mainWorkArea: string;
  conmpanyIntroImage: string;

  constructor(public router: Router, public http: Http, private route: ActivatedRoute, private el: ElementRef) {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
    contentHeaders.append('Authorization', this.jwt);//Header에 jwt값 추가하기
  }

  // 시공업체 정보 보기
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

  // 시공사례 삭제
  onDelBuildCase() {
    this.http.delete('http://localhost:3001/api/build-case/'+this.selectedId, {headers:contentHeaders}) //서버에 삭제할 builcase idx 값 전달
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          if(response.statusCode == 1){
            this.router.navigate(['/buildcaselist']); //서버에서 삭제가 성공적으로 완료 되면 시공사례 조회로 이동
          }
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      )
  }

  //시공사례 수정으로 이동
  onUpdateBuildCase() {
    this.router.navigate(['/buildcaseupdate/'+this.selectedId]); //수정 버튼을 누르면 수정 컴포턴트로 이동
  }

  ngAfterViewInit() {
    // URL 주소 뒤에 오는 param 값을 저장
    this.route.params.forEach((params: Params) => {
      let buildCaseIdx = +params['buildCaseIdx'];
      this.selectedId = buildCaseIdx;
    });

    //시공사례조회에서 클릭한 시공사례글에 대한 정보를 가져와서 각 항목별 변수에 저장함
    this.http.get('http://localhost:3001/api/build-case/'+this.selectedId, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
      .map(res => res.json())//받아온 값을 json형식으로 변경
      .subscribe(
        response => {
          this.title = response.buildCaseInfo.title;
          this.buildType = response.buildCaseInfo.buildType;
          this.buildPlace = response.buildCaseInfo.buildPlace;
          this.buildTotalArea = response.buildCaseInfo.buildTotalArea;
          this.mainPreviewImage = response.buildCaseInfo.mainPreviewImage;
          this.buildTotalPrice = response.buildCaseInfo.buildTotalPrice;
          this.HTMLText = response.buildCaseInfo.HTMLText;
          this.VRImages = JSON.parse(response.buildCaseInfo.VRImages);
          this.memberIdx = response.buildCaseInfo.memberIdx;

          // 비동기라서 통신이 완료 된 후에 해야지 member변수 값에 할당이 됨.
          // 일단 index.html에 짱박아놓음. 나중에 module로 빼자
          // proxy 이용
          embedpano({swf:"src/assets/js/lib/krpano-1.19-pr6-viewer/krpano-tour.swf",
              xml: ['/' + this.VRImages.baseDir, this.VRImages.vtourDir, this.VRImages.xmlName].join('/'),
              target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});
        },
        error => {
          console.error(error.text());
          //서버로 부터 응답 실패시 경고창
        }
      );
  }
}
