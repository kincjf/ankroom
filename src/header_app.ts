import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

const templates = require('./header_app.html');

@Component({
  selector: 'header-app',
  template: templates,
  directives: [ ROUTER_DIRECTIVES ]
})

export class Header_App {
  constructor(public router: Router) {}
}

