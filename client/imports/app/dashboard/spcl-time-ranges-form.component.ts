import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



import template from './spcl-time-ranges-form.component.html';

import {IMyDate} from "mydatepicker";

import {Roles} from "meteor/alanning:roles";
import {IMyDpOptions} from "mydatepicker";

import {SpclRanges} from "../../../../both/collections/spclRanges.collection";




@Component({
    selector: 'spcl-time-ranges-form',
    template,


})
export class SpclTimeRangesFormComponent implements OnInit {
    addForm: FormGroup;
    date: Date = new Date();

    myDateRangePickerOptions: IMyDpOptions;



    constructor(private formBuilder: FormBuilder,) {
    }

    ngOnInit() {
        var self =this;
        this.addForm = this.formBuilder.group({
            day: [, [Validators.required]],
            timeS:[,[Validators.required]],
            timeE:[,[Validators.required]]



        });
        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            disableUntil:{year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()},
        };
        $(' .timee').timepicker({ 'timeFormat': 'G:i  ','show2400':true, });
        $('.timee').on('changeTime', function() {
            $('.timee2').timepicker('remove');
            $('.timee2').val( Date.parse($('.timee').val().toString() ).addHours(1).toString("HH:mm"));
            $(' .timee2').timepicker({ 'timeFormat': 'G:i  ','show2400':true,'showDuration': true,'minTime': Date.parse($('.timee').val().toString() ).addHours(8).toString("HH:mm"),
                
                durationTime:$('.timee').val()});
            self.addForm.controls['timeS'].setValue($('.timee').val().toString());


        });
        $('.timee').on('changeTime', function() {
            self.addForm.controls['timeE'].setValue($('.timee2').val().toString());
        });

    }

// id:{$nin:Reservation.find($and{date:{$lt:new Date(ddd)},:{$gte:ddd},{_id:1})
    getdate(m: IMyDate): string {
        return m.year + "-" + m.month + "-" + m.day

    }

    addTime(): void {
        if(!Roles.userIsInRole(Meteor.userId(),"admin")){ return;}
        if(this.addForm.valid){
            this.addForm.controls["day"].setValue(new Date(this.addForm.controls["day"].value.formatted));
           SpclRanges.insert(Object.assign({},this.addForm.value));
            this.addForm.reset();

        }






    }

}