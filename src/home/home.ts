import { Component } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { NormalSignupChange } from '../member/normalSignupchange'
import {contentHeaders} from "../common/headers";

const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home',
  directives: [ CORE_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})
export class Home {
  jwt: string;
  decodedJwt: string;
  response: string;
  api: string;


  constructor(public router: Router, public http: Http, public authHttp: AuthHttp) {
    this.jwt = localStorage.getItem('id_token');
    this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
  }

  logout() {
    localStorage.removeItem('id_token');
    contentHeaders.delete('Authorization');
    this.router.navigate(['/login']);
  }

  callAnonymousApi() {
    this.router.navigate(['/normalsignupchange']);
  }

  callSecuredApi() {
    this.router.navigate(['/change']);
  }

  _callApi(type, url) {
    this.response = null;
    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this.authHttp.get(url)
        .subscribe(
          response => this.response = response.text(),
          error => this.response = error.text()
        );
    }
  }
}
