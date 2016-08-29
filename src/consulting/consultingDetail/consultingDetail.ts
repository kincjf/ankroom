/**
 * Created by insu on 2016-08-29.
 */
import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';

const template = require('./consultingDetail.html');

@Component({
  selector: 'consultingDetail',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class ConsultingDetail {
  constructor(public router: Router, public http: Http) {
  }
}
