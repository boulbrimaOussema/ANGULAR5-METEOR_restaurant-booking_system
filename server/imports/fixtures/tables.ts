import { Tables } from '../../../both/collections/tables.collection';
import { Table } from '../../../both/models/table.model';
import {Roles} from "meteor/alanning:roles";

export function loadTables() {
  if (Tables.find().cursor.count() === 0) {
    const tables: Table[] = [{
      num: 1,
      description: 'Can we please just for an evening not listen to dubstep.',
      max_seats: 4,
      price: 1000
    }, {
        num: 1,
        description: 'Can we please just for an evening not listen to dubstep.',
        max_seats: 4,
        price: 1000
    }, {
        num: 1,
        description: 'Can we please just for an evening not listen to dubstep.',
        max_seats: 4,
        price: 1000
    }];

    tables.forEach((table: Table) => Tables.insert(table));
  }


}