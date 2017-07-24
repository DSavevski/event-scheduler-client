import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef } from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {UserService} from "./user.service";
import {LoginUserComponent} from './login-user/login-user.component';
import {UserGuardService} from "./user-guard.service";
import {EventsComponent} from './events/events.component';
import {HomeComponent} from './home/home.component';
import {NewEventComponent} from './new-event/new-event.component';
import {MyEventsComponent} from './my-events/my-events.component';
import { Md2DatepickerModule }  from 'md2';
import { NgDateRangePickerModule } from 'ng-daterangepicker';
import {EventService} from "./event.service";
import {ImageUploadModule} from "angular2-image-upload";
import {ImageService} from "angular2-image-upload/lib/image.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterUserComponent,
    LoginUserComponent,
    EventsComponent,
    HomeComponent,
    NewEventComponent,
    MyEventsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgDateRangePickerModule,
    Md2DatepickerModule,
    ImageUploadModule
  ],
  providers: [UserService, UserGuardService, EventService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
