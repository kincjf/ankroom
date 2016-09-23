import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './member/signup';
import { Change } from './member/change';

import { BusinessNormalChange } from './member/businessNormalchange';
import { NormalSignup } from './member/normalSignup';
import { NormalSignupChange } from './member/normalSignupchange';
import { BusinessSignup } from './member/businessSignup';
import { BusinessSignupChange } from './member/businessSignupchange';

import { AuthGuard } from './common/auth.guard';
import { MainPage} from './common/mainPage/mainPage';

import { BuildCaseInput} from './buildCase/buildCaseInput';
import { BuildCaseUpdate} from './buildCase/buildCaseUpdate/buildCaseUpdate';
import { BuildCaseCase } from './buildCase/buildCaseCase/buildCaseCase';
import { BuildCaseLately } from './buildCase/buildCaseLately/buildCaseLately';
import { BuildCaseSelected } from './buildCase/buildCaseSelected/buildCaseSelected';
import { BuildCaseList } from './buildCase/buildCaseList/buildCaseList';
import { BuildCaseDetail } from './buildCase/detail/detail';

import { ConsultingCounsel } from './consulting/consultingCounsel/consultingCounsel';
import { ConsultingDetail } from './consulting/consultingDetail/consultingDetail';
import { ConsultingInfo } from './consulting/consultingInfo/consultingInfo';
import { ConsultingChange} from './consulting/consultingchange/consultingchange';

export const routes: RouterConfig = [
  { path: '',       component:  MainPage },  // 메인 페이지 화면

  { path: 'login',  component: Login }, // URL/login : 로그인
  { path: 'signup', component: Signup },  // URL/signup : 회원가입시 일반과 사업주 선택화면
  { path: 'change', component: Change },  // URL/change : 사업주 회원정보변경시 일반과 사업주정보선택화면

  { path: 'businessnormalchange', component: BusinessNormalChange },  // URL/businessnormalchange :  사업주가입자에서의 일반정보변경
  { path: 'normalsignup', component: NormalSignup },  // URL/normalsignup : 일반회원가입
  { path: 'normalsignupchange', component: NormalSignupChange },  // URL/normalsignupchange : 일반회원정보변경

  { path: 'businesssignup', component: BusinessSignup },  // URL/businesssignup : 사업주회원가입
  { path: 'businesssignupchange', component: BusinessSignupChange },  // URL/businesssignupchange : 사업주 회원정보변경

  { path: 'buildcaseinput', component: BuildCaseInput },  // URL/buildcaseinput : 시공사례입력
  { path: 'buildcaseupdate/:buildCaseIdx', component: BuildCaseUpdate },  // URL/buildcaseinput : 시공사례수정
  { path: 'buildcasecase', component: BuildCaseCase },  // URL/buildcasecase : 시공사례 검색 결과
  { path: 'buildcaselately', component: BuildCaseLately },  // URL/buildcaselately : 최근 본 시공사례 조회
  { path: 'buildcaseselected', component: BuildCaseSelected },  // URL/buildcaseselected : 찜 한 시공사례 조회
  { path: 'buildcaselist', component: BuildCaseList },  // URL/buildcaselist : 시공사례 조회
  { path: 'buildcasedetail/:buildCaseIdx', component: BuildCaseDetail },  // URL/buildcasedetail : 시공사례 상세보기

  { path: 'home',   component: Home, canActivate: [AuthGuard] },  //URL/home : 로그인 결과 테스트
  { path: 'mainPage',   component: MainPage },  // URL/mainPage : 메인페이지

  { path: 'consultingCounsel',   component: ConsultingCounsel },  // URL/consultingCounsel : 특정업체 컨설팅 상담
  { path: 'consultingDetail',   component: ConsultingDetail },  // URL/consultingDetail : 컨설팅 정보 상세보기
  { path: 'consultingInfo',   component: ConsultingInfo },  // URL/consultingInfo : 내 컨설팅 정보조회
  { path: 'consultingChange',  component: ConsultingChange},
  { path: '**',     component: MainPage }    // 라우터 설정에 없는 URL이 입력 되었을때  :  메인페이지로 이동
];
