import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Tables } from '../../../../both/collections/tables.collection';
import { Table } from '../../../../both/models/table.model';

import template from './tables-list.component.html';
import {Roles} from "meteor/alanning:roles";

@Component({
  selector: 'parties-list',
  template
})
export class TablesListComponent {
  tables: Observable<Table[]>;
    private tableID;
  constructor() {
    this.tables = Tables.find({}).zone();
  }

  removeParty(table: Table): void {
    Tables.remove(table._id);
  }
    clickMethod(name: string,table:Table) {
      if (this.isAdmin()){
        if(confirm("Are you sure to delete table "+name)) {
            this.removeParty(table);
        }}
    }

    isAdmin(){
      return Roles.userIsInRole(Meteor.userId(),'admin');
    }
    alertmsg(id){
        this.tableID =id;
    }
}
