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
import {UpPostEnrollmentComponent} from './up-post-enrollment/up-post-enrollment.component';
import {EnrollmentDetailComponent} from './enrollment-detail/enrollment-detail.component';
import {ManagerStudentComponent} from './manager-student/manager-student.component';
import {ManageCooperationComponent} from './manage-cooperation/manage-cooperation.component';
import {SidebarModule} from './sidebar/sidebar.module';
const routes: Routes = [
  { path: 'manage', loadChildren: './sidebar/sidebar.module#SidebarModule'},
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'cooperate', component: CooperateComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'password-reset/:id', component: PasswordResetComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'branchs', component: BranchComponent},
  { path: 'manage-student', component: ManagerStudentComponent},
  { path: 'manage-cooperation', component: ManageCooperationComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SidebarModule,
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
