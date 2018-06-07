import { CollectionObject } from './collection-object.model';

export interface Table extends CollectionObject {
  num: number;
  description: string;
  max_seats: number;
  price: number;
  picture : string;

}
