import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Tables } from '../../../../both/collections/tables.collection';

import template from './tables-form.component.html';
import {Roles} from "meteor/alanning:roles";


@Component({
  selector: 'tables-form',
  template,
    styleUrls: ['./tables-form.component.css']
})
export class TablesFormComponent implements OnInit {
  addForm: FormGroup;
    loading: boolean = false;

    @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      num: ['', [Validators.required ,Validators.pattern('^[0-9]+$')]],
      description: [],
      max_seats: ['', [Validators.required ,Validators.pattern('^[0-9]+$')]] ,
      price: ['', [Validators.required ,Validators.pattern('^[0-9]+$')]],
        picture:null
    });
  }

  addParty(): void {
      this.loading = true;
    if (this.addForm.valid) {

      Tables.insert(Object.assign({},this.addForm.value));
        setTimeout(() => {
            this.addForm.reset();
            this.loading = false;
        }, 1000);

    }
  }

    isAdmin(){
        return Roles.userIsInRole(Meteor.userId(),'admin');
    }

    onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.addForm.get('picture').setValue(

                    'data:image/jpg;base64,'+reader.result.split(',')[1]
                )
            };
        }
    }

    clearFile() {
        this.addForm.get('picture').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
}
