import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import template from './disabled-Dates-form.component.html';

import {IMyDate} from "mydatepicker";

import {Roles} from "meteor/alanning:roles";
import {IMyDrpOptions} from "mydaterangepicker";
import {DisabledDates} from "../../../../both/collections/DisabledDates.collection";




@Component({
    selector: 'disabled-Dates-form',
    template,


})
export class DisabledDatesFormComponent implements OnInit {
    addForm: FormGroup;
    date: Date = new Date();

    myDateRangePickerOptions: IMyDrpOptions;



    constructor(private formBuilder: FormBuilder,) {
    }

    ngOnInit() {

        this.addForm = this.formBuilder.group({
            Date: [, [Validators.required]],



        });
        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            disableUntil:{year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()},
        };


    }

// id:{$nin:Reservation.find($and{date:{$lt:new Date(ddd)},:{$gte:ddd},{_id:1})
    getdate(m: IMyDate): string {
        return m.year + "-" + m.month + "-" + m.day

    }

    addDate(): void {
        if(!Roles.userIsInRole(Meteor.userId(),"admin")){ return;}
        if(this.addForm.valid){



        DisabledDates.insert(Object.assign({},this.addForm.value));
            this.addForm.reset();

        }






    }

}