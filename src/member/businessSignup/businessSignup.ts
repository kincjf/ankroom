import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { contentHeaders } from '../../common/headers';

const template = require('./businessSignup.html');

@Component({
  selector: 'businessSignup',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES ],
  template: template
})
export class BusinessSignup {
  constructor(public router: Router, public http: Http) {
  }
  businesssignup(event, username, password, password_ok, phone, enterprise, represent, register_number, location, part, region, memberType) {
    event.preventDefault();
    let body = JSON.stringify({ username, password, password_ok, phone, enterprise, represent, register_number, location, part, region, memberType });
    this.http.post('http://localhost:3001/api/user', body, { headers: contentHeaders })
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['/home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }


}
