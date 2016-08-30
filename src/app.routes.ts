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
import { BuildCaseCase } from './buildCase/buildCaseCase/buildCaseCase';
import { BuildCaseLately } from './buildCase/buildCaseLately/buildCaseLately';
import { BuildCaseSelected } from './buildCase/buildCaseSelected/buildCaseSelected';
import { ConsultingCounsel } from './consulting/consultingCounsel/consultingCounsel';
import { ConsultingDetail } from './consulting/consultingDetail/consultingDetail';
import { ConsultingInfo } from './consulting/consultingInfo/consultingInfo';


export const routes: RouterConfig = [
  { path: '',       component:  Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'change', component: Change },
  { path: 'businessnormalchange', component: BusinessNormalChange },
  { path: 'normalsignup', component: NormalSignup },
  { path: 'normalsignupchange', component: NormalSignupChange },
  { path: 'businesssignup', component: BusinessSignup },
  { path: 'businesssignupchange', component: BusinessSignupChange },
  { path: 'buildcaseinput', component: BuildCaseInput },
  { path: 'buildcasecase', component: BuildCaseCase },
  { path: 'buildcaselately', component: BuildCaseLately },
  { path: 'buildcaseselected', component: BuildCaseSelected },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'mainPage',   component: MainPage },
  { path: 'consultingCounsel',   component: ConsultingCounsel },
  { path: 'consultingDetail',   component: ConsultingDetail },
  { path: 'consultingInfo',   component: ConsultingInfo },
  { path: '**',     component: Login },


];
