import { MongoObservable } from 'meteor-rxjs';

import { spclTimeRanges } from "../models/spclTimeRagnes.moel"

export const SpclRanges = new MongoObservable.Collection<spclTimeRanges>('spclranges');