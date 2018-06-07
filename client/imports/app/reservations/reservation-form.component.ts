import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Reservations} from "../../../../both/collections/reservations.collection"

import template from './reservation-form.component.html';
import {Tables} from "../../../../both/collections/tables.collection";
import {Table} from "../../../../both/models/table.model";
import {IMyDate, IMyDateModel} from "mydatepicker";
import {getDate} from "ngx-bootstrap/chronos/utils/date-getters";
import {Roles} from "meteor/alanning:roles";
import {MeteorObservable} from "meteor-rxjs";
import {DisabledDates} from "../../../../both/collections/DisabledDates.collection";
import {IMyDrpOptions} from "mydaterangepicker";
import {SpclRanges} from "../../../../both/collections/spclRanges.collection";




@Component({
    selector: 'reservations-form',
    template,


})
export class ReservationsFormComponent implements OnInit {
    addForm: FormGroup;
    date: Date = new Date();
    @Input() id  :string;
    @Input() disabled:any[] =[];

    disabledf:any=[];
    myDateRangePickerOptions: IMyDrpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
        disableUntil:{year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()},
        disableDateRanges: this.disabled
    };
    max_time:string='21:00';
    min_time:string="9:00";


    constructor(private formBuilder: FormBuilder,) {
        this.disabled = DisabledDates.find().cursor.map(res => {
            return {begin : res.Date.beginDate ,end: res.Date.endDate}
        });

        DisabledDates.find().cursor.forEach(res => {
            this.disabled.push( {begin : res.Date.beginDate ,end: res.Date.endDate})
        });

        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            disableUntil:{year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()},
            disableDateRanges: this.disabled
        };

    }

    ngOnInit() {
        var self=this;
        this.addForm = this.formBuilder.group({
            dateS: [, [Validators.required]],
            numberSeats: [2, [Validators.required]],
            timeStart : [,[Validators.required]],
            timeEnd: [,[Validators.required]],
            dateE:[],
            menuId:[,[Validators.required]]


        });
        DisabledDates.find().cursor.forEach(res => {
            this.disabled.push( {begin : res.Date.beginDate ,end: res.Date.endDate})
        });




    }
    chooseMenu($event){
        this.addForm.controls['menuId'].setValue($event)
    }

    addReservation(): void {

        DisabledDates.find().cursor.forEach(res => {
            this.disabledf.push( {begin : res.Date.beginJsDate ,end: res.Date.endJsDate})
        });

            this.disabledf.forEach((d)=>{if(this.addForm.controls['dateS'].value.jsdate.between(d.begin,d.end)) return alert("we're not working this day")});
            alert(Roles.userIsInRole(Meteor.userId(), 'admin'))
            let ddd = this.addForm.controls["dateS"].value.formatted;
            if (!Meteor.user()) return alert("you must be loggedIn");
            if (this.addForm.valid) {
                let tbl: Table;
                this.addForm.controls["dateE"].setValue(new Date(this.addForm.controls["dateS"].value.formatted + " " + this.addForm.controls["timeEnd"].value));
                this.addForm.controls["dateS"].setValue(new Date(this.addForm.controls["dateS"].value.formatted + " " + this.addForm.controls["timeStart"].value));
                let e = this.addForm.controls["dateE"].value;
                let s = this.addForm.controls["dateS"].value;

                let tables = Reservations.find({$or: [{$and: [{dateS: {$lte: s}}, {dateE: {$gte: s}}]}, {$and: [{dateS: {$lte: e}}, {dateE: {$gte: e}}]}]}, {
                    fields: {
                        tableId: 1,
                        _id: 0
                    }
                }).cursor.map(res => {
                    return res.tableId
                });
                if(this.id){
                    if(tables.includes(this.id))
                      return  alert("table is not available this time")
                    tbl = Tables.findOne();
                    tbl._id = this.id;

                }else {

                tbl = Tables.findOne({
                    max_seats: {$gte: this.addForm.controls['numberSeats'].value},
                    _id: {$nin: tables}
                }, {fields: {_id: 1}});
                if (!tbl) {
                    this.addForm.controls['dateS'].setValue(" no tables available")
                    return alert("there's no table available")

                }}


                Reservations.insert(Object.assign({}, this.addForm.value, {userId: Meteor.userId()}, {created: new Date()}, {tableId: tbl._id}));

                alert(this.id)
                this.addForm.reset();
                $('#myModal').modal('hide')
            }




        }

    onDateChanged(event: IMyDateModel) {
        DisabledDates.find().cursor.forEach(res => {
            this.disabled.push( {begin : res.Date.beginDate ,end: res.Date.endDate})
        });

        this.myDateRangePickerOptions = {
            // other options...
            dateFormat: 'dd.mm.yyyy',
            disableUntil:{year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate()},
            disableDateRanges: this.disabled
        };

        var self =this;
        $('.time2').timepicker('remove');
        $('.time').timepicker('remove');
        $('.time2').val('');
        $('.time').val('');
        this.addForm.controls['timeEnd'].setValue("");
        this.addForm.controls['timeStart'].setValue("");

       let spcl= SpclRanges.findOne({day: event.jsdate})
        if(spcl){
           alert(spcl.timeE)
        this.max_time=spcl.timeE;
       this.min_time = spcl.timeS;}
       else {
            this.max_time='21:00';
            this.min_time='9:00';
        }

        $(' .time').timepicker({ 'timeFormat': 'G:i  ','show2400':true,'minTime': this.min_time,
            'maxTime': this.max_time });
        $('.time').val(this.min_time);
        $('.time2').val( Date.parse($('.time').val().toString() ).addHours(1).toString("HH:mm"));
        self.addForm.controls['timeStart'].setValue($('.time').val().toString());
        self.addForm.controls['timeEnd'].setValue($('.time2').val().toString());

        $('.time').on('changeTime', function() {
            $('.time2').timepicker('remove');
            $('.time2').val( Date.parse($('.time').val().toString() ).addHours(1).toString("HH:mm"));
            $(' .time2').timepicker({ 'timeFormat': 'G:i  ','show2400':true,'showDuration': true,'minTime': Date.parse($('.time').val().toString() ).addHours(1).toString("HH:mm"),
                'maxTime': Date.parse($('.time').val().toString() ).addHours(3).toString("HH:mm ") ,
                durationTime:$('.time').val()});
            self.addForm.controls['timeStart'].setValue($('.time').val().toString());
            self.addForm.controls['timeEnd'].setValue($('.time2').val().toString());});

        $('.time2').on('changeTime', function() {
            self.addForm.controls['timeEnd'].setValue($('.time2').val().toString());
        });


    }

}