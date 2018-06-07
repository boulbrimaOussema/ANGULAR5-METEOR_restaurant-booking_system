import { Meteor } from 'meteor/meteor';

import { loadTables } from './imports/fixtures/tables';
import {loadReservations} from "./imports/fixtures/reservations";
import './imports/methods/usersMethods'

Meteor.startup(() => {
  loadTables();
  loadReservations();
});
