import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { contentHeaders } from './common/headers';

const template = require('./app.html');

@Component({
  selector: 'auth-app',
  template: template,
  directives: [ ROUTER_DIRECTIVES ]
})



export class App {
  private jwt:string;

  constructor(public router: Router) {
    this.jwt = localStorage.getItem('id_token'); //login 여부를 확이하기 위함
  }

  logout() {
    localStorage.removeItem('id_token');
    contentHeaders.delete('Authorization');
    this.router.navigate(['/login']);
  }
}
