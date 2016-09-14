import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Subscription }       from 'rxjs/Subscription';

const template = require('./detail.html');

@Component({
    selector: 'buildCaseDetail',
    directives: [ ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES ],
    template: template
})

export class BuildCaseDetail {
  private sub:Subscription;
  private route:ActivatedRoute;
  private router:Router;

  public selectedId:number;

  ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params['id']; // (+) converts string 'id' to a number
      });
  }
}
