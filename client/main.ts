import 'angular2-meteor-polyfills';
import 'jquery';
import * as $ from 'jquery';

import 'time/jquery.timepicker.min.js';
import 'popper.js';
import 'bootstrap';
import "time/date.js";
import "time/bootstrap-table.js";
import "time/jq.js";
import "time/jquery.backstretch.js";
import "time/jquery-migrate-3.0.0.min.js";
import "time/retina-1.1.0.js";
import "time/wow.js";
import "time/owl.carousel.min.js";
import "time/slick.js"
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './imports/app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);