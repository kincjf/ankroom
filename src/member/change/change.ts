import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';

const template = require('./change.html');

@Component({
  selector: 'change',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})

/**
 * 회원가입 수정 가이드 페이지(삭제 필요)
 */
export class Change {
  constructor(public router: Router, public http: Http) {
  }

}
