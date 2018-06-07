import { CollectionObject } from './collection-object.model';

export interface Menu extends CollectionObject {
    name: string;
    description: string;
    price: number;
    picture : string;

}
