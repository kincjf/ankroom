import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

const template = require('./buildCaseInput.html');

@Component({
  selector: 'buildCaseInput',
  template: template,
  directives: [ ROUTER_DIRECTIVES ]
})

export class BuildCaseInput{
  constructor(public router: Router) {}
}
