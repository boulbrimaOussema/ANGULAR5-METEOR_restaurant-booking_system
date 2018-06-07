import { Reservations } from '../../../both/collections/reservations.collection';
import { Reservation } from '../../../both/models/reservation.model';

export function loadReservations() {
    if (Reservations.find().cursor.count() === 0) {
        const tables: Reservation[] = [{
            userId: "1",
            tableId: "1",
            created: Date.now().toString(),
            date : Date.now().toString()




        },
            {
                userId: "1",
                tableId: "1",
                created: Date.now().toString(),
                date : Date.now().toString()




            },
            {
                userId: "1",
                tableId: "1",
                created: Date.now().toString(),
                date : Date.now().toString()




            }];

        tables.forEach((table: Reservation) => Reservations.insert(table));
    }
}