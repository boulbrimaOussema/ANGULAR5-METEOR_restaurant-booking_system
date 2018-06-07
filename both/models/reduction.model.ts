import { CollectionObject } from './collection-object.model';
import {IMyDateRange} from "mydaterangepicker";

export interface reduction extends CollectionObject {
    date:IMyDateRange;
    pourcentage:number;

}
