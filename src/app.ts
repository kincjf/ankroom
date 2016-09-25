import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {Http, Headers} from '@angular/http';

const template = require('./app.html');

@Component({
  selector: 'auth-app',
  template: template,
  directives: [ROUTER_DIRECTIVES]
})

export class App {
  jwt: string;
  logined: boolean = false;

  constructor(public router: Router, public http: Http) {
  }

  ngAfterContentInit() {    // 로딩때 한번만 뜨는데, life cycle을
    this.setHeaderUserMenu();
  }

  logout() {
    //html받은 값들을 json형식으로 저장
    localStorage.removeItem('id_token');
    alert("로그아웃 되었습니다.");

    this.router.navigate(['/']);
    this.setHeaderUserMenu();
  }

  setHeaderUserMenu() {
    this.jwt = localStorage.getItem('id_token'); //login시 저장된 jwt값 가져오기

    if (this.jwt) {
      this.logined = true;
    } else {
      this.logined = false;
    }
  }
}
