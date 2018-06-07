import { Route } from '@angular/router';

import { TablesListComponent } from './tables/tables-list.component';
import { TableDetailsComponent } from './tables/table-details.component';
import { ReservationsListComponent } from './reservations/reservations-list.component';
import {LandingPageComponent} from "./reservations/landing-page.component";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {Roles} from "meteor/alanning:roles";



export const routes: Route[] = [
  { path: '', component: LandingPageComponent },
    { path: 'tables', component: TablesListComponent },
  { path: 'table/:tableId', component: TableDetailsComponent },
    { path: 'reservations', component: ReservationsListComponent },
    {path: 'dashboard',
        component: DashboardComponent, canActivate:['canActivateForAdmin']}

];

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForAdmin',
    useValue: () => isAdmin()
}];

function isAdmin(){
    return Roles.userIsInRole(Meteor.userId(),'admin');
}
