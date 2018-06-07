import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Reservations } from '../../../../both/collections/reservations.collection';
import { Reservation } from '../../../../both/models/reservation.model';

import template from './reservations-list.component.html';

@Component({
    selector: 'reservations-list',
    template
})
export class ReservationsListComponent {
    reservations: Observable<Reservation[]>;
        data;
    constructor() {

        this.reservations = Reservations.find({}).zone();
        this.data=Reservations.find({}).cursor.fetch();
        $('#table').bootstrapTable({data:this.data})
    }

    removeReservation(reservation: Reservation): void {
        Reservations.remove(reservation._id);
    }
    clickMethod(name: string,reservation:Reservation) {
        if(confirm("Are you sure to delete table "+name)) {
            this.removeReservation(reservation);
        }
    }
}