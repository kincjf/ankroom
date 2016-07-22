import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Login } from './login';
import { Signup } from './member/signup';
import { NormalSignup } from './member/normalSignup';
import { BusinessSignup } from './member/businessSignup';
import { AuthGuard } from './common/auth.guard';
import {MainPage} from './common/mainPage/mainPage';

export const routes: RouterConfig = [
  { path: '',       component:  Login },
  { path: 'login',  component: Login },
  { path: 'signup', component: Signup },
  { path: 'normalsignup', component: NormalSignup },
  { path: 'businesssignup', component: BusinessSignup },
  { path: 'home',   component: Home, canActivate: [AuthGuard] },
  { path: 'mainPage',   component: MainPage },
  { path: '**',     component: Login },

];
