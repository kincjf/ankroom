import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

const template = require('./mainPage.html');

@Component({
  selector: 'mainPage',
  template: template,
  directives: [ ROUTER_DIRECTIVES ]
})

export class MainPage{
  constructor(public router: Router) {}
}
