import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./normalSignup.html');

@Component({
  selector: 'normalSignup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template,
})
export class NormalSignup {
  constructor(public router: Router, public http: Http) {
  }
  // 회원가입시 memberType도 집어넣기!


}
