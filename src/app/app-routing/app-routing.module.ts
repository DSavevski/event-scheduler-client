import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {RegisterUserComponent} from "../register-user/register-user.component";
import {LoginUserComponent} from "../login-user/login-user.component";
import {AppComponent} from "../app.component";
import {UserGuardService} from "../user-guard.service";
import {EventsComponent} from "../events/events.component";
import {HomeComponent} from "../home/home.component";
import {NewEventComponent} from "../new-event/new-event.component";
import {MyEventsComponent} from "../my-events/my-events.component";

const routes: Route[] = [

  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'new-event',
    component: NewEventComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'my-events',
    component: MyEventsComponent,
    canActivate: [UserGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false}),
    CommonModule
  ],
  declarations: []
})
export class AppRoutingModule { }
