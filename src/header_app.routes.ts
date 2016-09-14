import { RouterConfig } from '@angular/router';
import { Signup } from './member/signup';

export const header_routes: RouterConfig = [
  { path: '',       component:  Signup },  // 기본 페이지 화면 : 현재는 로그인 페이지
  { path: 'signup', component: Signup },  // URL/signup : 회원가입시 일반과 사업주 선택화면
  { path: 'change', component: Signup },  // URL/change : 사업주 회원정보변경시 일반과 사업주정보선택화면
  { path: 'normalsignup', component: Signup },  // URL/normalsignup : 일반회원가입
];
