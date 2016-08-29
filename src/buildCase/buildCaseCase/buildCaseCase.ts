import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';


const template = require('./buildCaseCase.html');

@Component({
    selector: 'buildCaseCase',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template
})
export class BuildCaseCase {
  }
