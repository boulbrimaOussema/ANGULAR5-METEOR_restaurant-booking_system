import { CollectionObject } from './collection-object.model';

export interface Reservation extends CollectionObject {
    tableId: string;
    userId: string;
    menuId:string;
    dateS: string;
    dateE:string;
    created: string;
    timeStart:string;
    timeEnd:string;



}