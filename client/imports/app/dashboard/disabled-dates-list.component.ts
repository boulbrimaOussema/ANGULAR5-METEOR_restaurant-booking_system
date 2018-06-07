import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';



import template from './disabled-dates-list.component.html';
import {Disabled} from "../../../../both/models/DisabledDates.model";
import {DisabledDates} from "../../../../both/collections/DisabledDates.collection";

@Component({
    selector: 'disabled-dates-list',
    template
})
export class DisabledDatesListComponent {
    disabled_dates: Observable<Disabled[]>;
    data;
    constructor() {

        this.disabled_dates = DisabledDates.find({}).zone();
    }

    removeDisabled(disabled: Disabled): void {
        DisabledDates.remove(disabled._id);
    }
    clickMethod(name: string,disabled:Disabled) {
        if(confirm("Are you sure to delete table "+name)) {
            this.removeDisabled(disabled);
        }
    }
}