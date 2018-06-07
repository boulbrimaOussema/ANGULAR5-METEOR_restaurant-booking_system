import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Menus } from '../../../../both/collections/menu.collection';
import { Menu } from '../../../../both/models/menu.model';

import template from './menu-list.component.html';
import {Roles} from "meteor/alanning:roles";
import {CarouselOptions} from "ng2-owl-carousel2";

@Component({
    selector: 'menus-list',
    template
})
export class MenusListComponent implements AfterViewInit{
    menus: Observable<Menu[]>;



    onItemSelect(carouselItem:any):void{
        //this carousel item can be used anywhere
    }
    clk(i){
        alert(i)
    }

    constructor() {
        this.menus = Menus.find({}).zone();

    }
ngAfterViewInit(){
    $(".owl-carousel").owlCarousel();
}

    removeParty(menu: Menu): void {
        Menus.remove(menu._id);
    }
    clickMethod(name: string,menu:Menu) {
        if (this.isAdmin()){
            if(confirm("Are you sure to delete menu "+name)) {
                this.removeParty(menu);
            }}
    }

    isAdmin(){
        return Roles.userIsInRole(Meteor.userId(),'admin');
    }

}
