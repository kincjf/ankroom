import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Http, Headers} from '@angular/http';
import {contentHeaders} from '../common/headers';
import { App } from '../app';
import { config } from '../common/config';


const template = require('./login.html');

@Component({
  selector: 'login',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})

/**
 * App.ts의 Child로 넣어야 한다. 그래야 로그인/비로그인 상태시에 대한 UI 조작이 유기적으로 가능함.
 */
export class Login {
  constructor(public router: Router, public http: Http, public app: App) {
  }

  login(event, email, password) {
    //html에서의 value값
    event.preventDefault();
    let body = JSON.stringify({email, password});
    //html받은 값들을 json형식으로 저장

    let URL = [config.serverHost, config.path.login].join('/');

    this.http.post(URL, body, {headers: contentHeaders})
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);

          this.app.setHeaderUserMenu();

          this.router.navigate(['/']);
          //서버로부터 응답 성공시 home으로 이동
        },
        error => {
          alert(error.text());
          console.log(error.text());
          //서버로부터 응답 실패시 경고창
        }
      );
  }
}
