import { Component } from '@angular/core';
import { Roles } from 'meteor/alanning:roles';
import template from './app.component.html';



@Component({
  selector: 'app',
  template,
    styleUrls:['./cc.css']
})
export class AppComponent {

    constructor() {


    }
    isAdmin(){
        return Roles.userIsInRole(Meteor.userId(),'admin');
    }
}
