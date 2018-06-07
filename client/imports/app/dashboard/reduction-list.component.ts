import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';



import template from './reduction-list.component.html';

import {reduction} from "../../../../both/models/reduction.model";
import {Reductions} from "../../../../both/collections/reduction.collection";

@Component({
    selector: 'reduction-list',
    template
})
export class ReductionListComponent {
    reductions: Observable<reduction[]>;
    data;
    constructor() {

        this.reductions = Reductions.find({}).zone();
    }

    removeDisabled(disabled: reduction): void {
        Reductions.remove(disabled._id);
    }
    clickMethod(name: string,disabled:reduction) {
        if(confirm("Are you sure to delete reduction periode  "+name)) {
            this.removeDisabled(disabled);
        }
    }
}