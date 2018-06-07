

import {Roles} from "meteor/alanning:roles";

Meteor.methods({
    makeAdmin: function (id:string, role:string) {Roles.addUsersToRoles(id,role)}

    });

Meteor.methods({

    adduser: function (credit) { Meteor.users.after.insert( function(credit){
        Roles.addUsersToRoles(credit._id,"user");})
    }});