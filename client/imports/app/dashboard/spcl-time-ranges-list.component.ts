import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';



import template from './spcl-time-ranges-list.component.html';
import {spclTimeRanges} from "../../../../both/models/spclTimeRagnes.moel";
import {SpclRanges} from "../../../../both/collections/spclRanges.collection";

@Component({
    selector: 'spcl-time-ranges-list',
    template
})
export class SpclTimeRangesListComponent {
    spcl_times: Observable<spclTimeRanges[]>;
    data;
    constructor() {

        this.spcl_times = SpclRanges.find({}).zone();
    }

    removeDisabled(disabled: spclTimeRanges): void {
        SpclRanges.remove(disabled._id);
    }
    clickMethod(name: string,disabled:spclTimeRanges) {
        if(confirm("Are you sure to delete table "+name)) {
            this.removeDisabled(disabled);
        }
    }
}