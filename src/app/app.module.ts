import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
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
import {CommonModule} from '@angular/common';
import { EditEventComponent } from './edit-event/edit-event.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';
import { Test2Component } from './test2/test2.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterUserComponent,
    LoginUserComponent,
    EventsComponent,
    HomeComponent,
    NewEventComponent,
    MyEventsComponent,
    EditEventComponent,
    UserProfileComponent,
    NotFoundComponent,
    Test2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgDateRangePickerModule,
    Md2DatepickerModule,
    ImageUploadModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [UserService, UserGuardService, EventService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
