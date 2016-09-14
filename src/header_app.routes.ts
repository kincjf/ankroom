import { RouterConfig } from '@angular/router';
import { Signup } from './member/signup';

// app.route랑 겹치는 path에 component은 다름....
// 이 부분 수정 안하면 라우팅이 꼬이기 때문에 아직은 메인 라우팅에 추가하지 않겠음
export const routes: RouterConfig = [
  { path: '',       component:  Signup },  // 기본 페이지 화면 : 현재는 로그인 페이지
  { path: 'signup', component: Signup },  // URL/signup : 회원가입시 일반과 사업주 선택화면
  { path: 'change', component: Signup },  // URL/change : 사업주 회원정보변경시 일반과 사업주정보선택화면
  { path: 'normalsignup', component: Signup },  // URL/normalsignup : 일반회원가입
];
