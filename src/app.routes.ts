import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Login } from './login';

import { Signup } from './member/signup';
import { Change } from './member/change';

import { NormalSignup } from './member/normalSignup';
import { NormalSignupChange } from './member/normalSignupchange';
import { BusinessSignup } from './member/businessSignup';
import { BusinessSignupChange } from './member/businessSignupchange';

import { ListCheck } from './businessList/listCheck/listCheck';
import { ListDetailinfo } from './businessList/listDetailinfo/listDetailinfo';

import { AuthGuard } from './common/auth.guard';
import { MainPage} from './common/mainPage/mainPage';

import { BuildCaseInput} from './buildCase/buildCaseInput';
import { BuildCaseUpdate} from './buildCase/buildCaseUpdate/buildCaseUpdate';
import { BuildCaseLately } from './buildCase/buildCaseLately/buildCaseLately';
import { BuildCaseList } from './buildCase/buildCaseList/buildCaseList';
import { BuildCaseDetail } from './buildCase/detail/detail';

import { ConsultingCounsel } from './consulting/consultingCounsel/consultingCounsel';
import { ConsultingDetail } from './consulting/consultingDetail/consultingDetail';
import { ConsultingListInfo } from './consulting/consultingListInfo/consultingListInfo';
import { ConsultingChange} from './consulting/consultingchange/consultingchange';

export const routes: RouterConfig = [
  { path: '',       component:  MainPage },  // 메인 페이지 화면

  { path: 'login',  component: Login }, // URL/login : 로그인

  { path: 'signup', component: Signup },  // URL/signup : 회원가입시 일반과 사업주 선택화면
  { path: 'change', component: Change },  // URL/change : 사업주 회원정보변경시 일반과 사업주정보선택화면

  { path: 'normalsignup', component: NormalSignup },  // URL/normalsignup : 일반회원가입
  { path: 'normalsignupchange', component: NormalSignupChange },  // URL/normalsignupchange : 일반회원정보변경

  { path: 'businesssignup', component: BusinessSignup },  // URL/businesssignup : 사업주회원가입
  { path: 'businesssignupchange', component: BusinessSignupChange },  // URL/businesssignupchange : 사업주 회원정보변경

  { path: 'businesslist', component: ListCheck },  // URL/businesslist : 사업주 목록 조회
  { path: 'businessdetail', component: ListDetailinfo },  // URL/businessdetail : 사업주 상세보기

  { path: 'buildcaseinput', component: BuildCaseInput },  // URL/buildcaseinput : 시공사례입력
  { path: 'buildcaseupdate/:buildCaseIdx', component: BuildCaseUpdate },  // URL/buildcaseinput : 시공사례수정
  { path: 'buildcaselately', component: BuildCaseLately },  // URL/buildcaselately : 최근 본 시공사례 조회
  { path: 'buildcaselist', component: BuildCaseList },  // URL/buildcaselist : 시공사례 조회
  { path: 'buildcasedetail/:buildCaseIdx', component: BuildCaseDetail },  // URL/buildcasedetail : 시공사례 상세보기

  { path: 'home',   component: Home, canActivate: [AuthGuard] },  //URL/home : 로그인 결과 테스트

  { path: 'listCheck',   component: ListCheck },  // URL/listCheck : 업체목록조회하기
  { path: 'listDetailinfo/:bizUserIdx',   component: ListDetailinfo },  // URL/listDetailinfo : 업체목록 상세보기

  { path: 'consultingCounsel',   component: ConsultingCounsel },  // URL/consultingCounsel : 특정업체 컨설팅 상담
  { path: 'consultingDetail/:consultingIdx',   component: ConsultingDetail },  // URL/consultingDetail : 컨설팅 정보 상세보기
  { path: 'consultingListInfo',   component: ConsultingListInfo },  // URL/consultingListInfo : 내 컨설팅 정보조회
  { path: 'myConsultingListInfo',   component: ConsultingListInfo },  // URL/consultingListInfo : 내 컨설팅 정보조회
  { path: 'consultingChange/:consultingIdx',  component: ConsultingChange},  // URL/consultingChange : 컨설팅 정보변경
  { path: '**',     component: MainPage }    // 라우터 설정에 없는 URL이 입력 되었을때  :  메인페이지로 이동
];
