import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'; 

import 'rxjs/add/operator/map';

import { Tables } from '../../../../both/collections/tables.collection';
import { Table } from '../../../../both/models/table.model';

import template from './table-details.component.html';

@Component({
  selector: 'table-details',
  template
})
export class TableDetailsComponent implements OnInit, OnDestroy {
  tableId: string;
  paramsSub: Subscription;
  table: Table;
  r:Date;


  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['tableId'])
      .subscribe(tableId => {
        this.tableId = tableId;
        
        this.table = Tables.findOne(this.tableId);
      });

  }

  saveParty() {
    Tables.update(this.table._id, {
      $set: {
        num: this.table.num,
        description: this.table.description,
        max_seats: this.table.max_seats,
        price: this.table.price
      }
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
