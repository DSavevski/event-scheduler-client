import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {RegisterUserComponent} from "../register-user/register-user.component";
import {LoginUserComponent} from "../login-user/login-user.component";
import {UserGuardService} from "../user-guard.service";
import {EventsComponent} from "../events/events.component";
import {HomeComponent} from "../home/home.component";
import {NewEventComponent} from "../new-event/new-event.component";
import {MyEventsComponent} from "../my-events/my-events.component";
import {EditEventComponent} from "../edit-event/edit-event.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {AccountActivationComponent} from "../account-activation/account-activation.component";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {ResetForgottenPasswordComponent} from "../reset-forgotten-password/reset-forgotten-password.component";
import {ProcessPaymentComponent} from "../process-payment/process-payment.component";

const routes: Route[] = [

  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'

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
    path: 'edit-event/:id',
    component: EditEventComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'my-events',
    component: MyEventsComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [UserGuardService]
  },
  {
    path: 'registration',
    component: AccountActivationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password',
    component: ResetForgottenPasswordComponent
  },
  {
    path: 'process-payment',
    component: ProcessPaymentComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: false}),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
