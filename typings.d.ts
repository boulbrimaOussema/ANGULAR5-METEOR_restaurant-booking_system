/// <reference types="zone.js" />
/// <reference types="meteor-typings" />
/// <reference types="@types/underscore" />

declare module '*.html' {
  const template: string;
  export default template;
}

declare module '*.scss' {
  const style: string;
  export default style;
}

declare module '*.less' {
  const style: string;
  export default style;
}

declare module '*.css' {
  const style: string;
  export default style;
}

declare module '*.sass' {
  const style: string;
  export default style;
}

declare module "meteor/alanning:roles" {
    export module Roles {
        function createRole(roleName: string): string;
        function deleteRole(roleName: string): void;
        function addUsersToRoles(users: any, roles: any, groups?: string): void;
        function removeUsersFromRoles(users: any, roles: any): void;
        function userIsInRole(user: any, roles: any): boolean;  //user can be user ID or user object
        function getRolesForUser(userId: string): string[];

        var GLOBAL_GROUP: string;
    }
}