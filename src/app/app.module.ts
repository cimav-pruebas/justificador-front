import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { AUTH_PROVIDERS }  from  'angular2-jwt';
import { Auth } from              './auth.service';
import {AppConfig} from "./app.config";
import {DataService} from "./data.service";

import { AppComponent } from './app.component';
import {ContentComponent} from "./content.component";

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,

    PolymerElement('vaadin-combo-box'),
    PolymerElement('vaadin-date-picker'),
    PolymerElement('paper-input'),

    PolymerElement('app-header-layout'),
    PolymerElement('app-header'),
    PolymerElement('app-toolbar'),

    PolymerElement('iron-image'),

      // good

    PolymerElement('paper-textarea'),
    PolymerElement('paper-card'),
    PolymerElement('paper-button'),
    PolymerElement('paper-fab'),
    PolymerElement('paper-radio-group'),
    PolymerElement('paper-radio-button'),

    PolymerElement('paper-progress'),
    PolymerElement('paper-submenu'),
    PolymerElement('paper-menu'),
    PolymerElement('paper-item'),
    PolymerElement('paper-icon-button'),
    PolymerElement('paper-tabs'),
    PolymerElement('paper-tab'),
    PolymerElement('iron-icon'),
    PolymerElement('paper-dialog'),
    PolymerElement('paper-checkbox'),
    PolymerElement('paper-tooltip'),
    PolymerElement('paper-toast'),
    PolymerElement('paper-scroll-header-panel')

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AppConfig,
    AUTH_PROVIDERS,
    Auth,
    DataService,
    AppComponent,
    ContentComponent
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
