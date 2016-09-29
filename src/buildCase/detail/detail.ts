import { Component, ElementRef } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute, Params } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Subscription }       from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';
import { config } from '../../common/config';

declare var jQuery: JQueryStatic;
const template = require('./detail.html');

@Component({
    selector: 'buildCaseDetail',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template
})

/*
    Component 역할 : 선택한 시공사례 글 상세보기
    작업상황 :
      - 글에 대한 권한이 있는 사람에게만 수정,삭제 버튼이 보이고 나머지는 목록 버튼이 보이게 하기(완료)
    차후 개선방안 :
      -
 */
export class BuildCaseDetail {
  jwt:string;
  private decodedJwt:any;
  private loginMemberIdx: number;
  public selectedId:number;

  public data: any;
  title:string;
  buildType:string;
  buildPlace:string;
  buildTotalArea:number;
  mainPreviewImage:string;
  buildTotalPrice:number;
  HTMLText:any;
  VRImages: any;

  memberIdx: number;
  companyName: string;
  aboutCompany: string;
  mainWorkField: string;
  mainWorkArea: string;
  conmpanyIntroImage: string;

  constructor(public router: Router, public http: Http, private route: ActivatedRoute, private el: ElementRef) {
    // 삭제, 수정을 위한 Auth 값 할당
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기
    if(this.jwt){ //jwt 값이 null 인지 즉, 로그인을 하지 않는 상태인지 확인
      this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);//jwt값 decoding
      this.loginMemberIdx = this.decodedJwt.idx; //현재 로그인한 memberIdx 저장
    }else{
      this.loginMemberIdx = null; //로그인 하지 않는 상태일때는 null값
    }
    contentHeaders.append('Authorization', this.jwt);//Header에 jwt값 추가하기
  }

  /*
   Method 역할 : 선택한 시공사례 글을 작성한 시공업체 정보를 가져오기
   작업상황 : 없음
   차후 개선방안 : 없음
   */
  onBizUserInfo() {
    let URL = [config.serverHost, config.path.bizStore, this.memberIdx].join('/');

    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
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

  /*
   Method 역할 : 선택한 시공사례 글을 삭제
   작업상황 : 없음
   차후 개선방안 : 없음
   */
  onDelBuildCase() {
    if (confirm("삭제 하시겠습니까?")) {
      let URL = [config.serverHost, config.path.buildCase, this.selectedId].join('/');

      this.http.delete(URL, {headers:contentHeaders}) //서버에 삭제할 builcase idx 값 전달
        .map(res => res.json())//받아온 값을 json형식으로 변경
        .subscribe(
          response => {
            if(response.statusCode == 1){
              alert("삭제 되었습니다.");
              this.router.navigate(['/buildcaselist']); //서버에서 삭제가 성공적으로 완료 되면 시공사례 조회로 이동
            }
          },
          error => {
            alert("삭제를 실패하였습니다. 관리자에게 문의하세요. - errorCode : " + error.text());
            console.log(error.text());
            //서버로 부터 응답 실패시 경고창
          }
        )
    }
  }

  /*
   Method 역할 : 선택한 시공사례 글을 수정 컴포넌트로 이동
   작업상황 : 없음
   차후 개선방안 : 없음
   */
  onUpdateBuildCase() {
    this.router.navigate(['/buildcaseupdate/'+this.selectedId]); //수정 버튼을 누르면 수정 컴포턴트로 이동
  }

  /*
   Method 역할 : 시공사례 목록 조회로 이동
   작업상황 : 없음
   차후 개선방안 : 없음
   */
  onListBuildCase() {
    this.router.navigate(['/buildcaselist']); // 목록버튼을 누르면 시공사례 목록 조회로 이동
  }

  ngAfterViewInit() {
    // URL 주소 뒤에 오는 param 값을 저장
    this.route.params.forEach((params: Params) => {
      let buildCaseIdx = +params['buildCaseIdx'];
      this.selectedId = buildCaseIdx;
    });

    let URL = [config.serverHost, config.path.buildCase, this.selectedId].join('/');

    //시공사례조회에서 클릭한 시공사례글에 대한 정보를 가져와서 각 항목별 변수에 저장함
    this.http.get(URL, {headers:contentHeaders}) //서버로부터 필요한 값 받아오기
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

    this.onBizUserInfo();
  }
}
