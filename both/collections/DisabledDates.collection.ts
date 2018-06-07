import { MongoObservable } from 'meteor-rxjs';

import { Disabled } from '../models/DisabledDates.model';

export const DisabledDates = new MongoObservable.Collection<Disabled>('disabledDates');
