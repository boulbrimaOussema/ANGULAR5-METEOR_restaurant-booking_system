import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import {routes, ROUTES_PROVIDERS} from './app.routes';
import { TABLES_DECLARATIONS } from './tables';
import { RESERVATIONS_DECLARATIONS } from './reservations';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule} from "mydaterangepicker"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MENUS_DECLARATIONS} from "./menu/index";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {DASHBOARD_DECLARATIONS} from "./dashboard/index";



const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,},
    breakpoints: {
        1024: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    }
};

@NgModule({
  imports: [

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AccountsModule,
      MyDatePickerModule,
      SwiperModule,
      MyDateRangePickerModule





  ],

    providers: [
    {
        provide: SWIPER_CONFIG,
        useValue: DEFAULT_SWIPER_CONFIG
    },
        ROUTES_PROVIDERS
],
  declarations: [
    AppComponent,
    ...TABLES_DECLARATIONS,
      ...RESERVATIONS_DECLARATIONS,
      ...MENUS_DECLARATIONS,
      ...DASHBOARD_DECLARATIONS






  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}