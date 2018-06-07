import { Component } from '@angular/core';

import template from './landing-page.component.html';
import {DisabledDates} from "../../../../both/collections/DisabledDates.collection";

@Component({
    selector: 'landing',
    template,
    styleUrls:["./landing-page.component.css"]

})
export class LandingPageComponent {
    dis : any;
    constructor() {
         this.dis = DisabledDates.find().cursor.map(res => {
            return {begin: res.Date.beginDate, end: res.Date.endDate}
        });
    }

}
