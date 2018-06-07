import { MongoObservable } from 'meteor-rxjs';

import { reduction } from '../models/reduction.model';

export const Reductions = new MongoObservable.Collection<reduction>('reductions');
