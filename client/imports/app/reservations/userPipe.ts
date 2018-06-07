import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {Tables} from "../../../../both/collections/tables.collection";
import {Table} from "../../../../both/models/table.model";
import {Observable} from "rxjs/Observable";
import {ObservableCursor} from "meteor-rxjs";

@Pipe ({
    name: 'userName'
})

export class UserNamePipe implements PipeTransform {
    transform(tableId: string): string {
        let user: ObservableCursor<Table> ;
         user = Tables.find(tableId);

        if (!user)
            return ' nothing ';



        return "table  " + user.cursor.map(t=> {return t.num })  }
}


