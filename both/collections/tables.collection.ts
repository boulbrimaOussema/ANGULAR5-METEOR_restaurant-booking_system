import { MongoObservable } from 'meteor-rxjs';

import { Table } from '../models/table.model';

export const Tables = new MongoObservable.Collection<Table>('tables');
