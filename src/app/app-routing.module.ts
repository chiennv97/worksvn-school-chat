import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CooperateComponent } from './cooperate/cooperate.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BranchComponent } from './branch/branch.component';
import { EventComponent } from './event/event.component';
import { EventModule } from './event/event.module';
const routes: Routes = [
  { path: 'events', loadChildren: 'app/event/event.module#EventModule'},
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'cooperate', component: CooperateComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'password-reset/:id', component: PasswordResetComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'branchs', component: BranchComponent},
  { path: 'events', component: EventComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    // RouterModule.forChild(routes),
  ],
  declarations: [],
  exports: [
    RouterModule,
    EventModule,
  ]
})
export class AppRoutingModule { }
