import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInService } from './service/sign-in.service';

import { CooperateComponent } from './cooperate/cooperate.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BranchComponent } from './branch/branch.component';
import { EnrollmentsComponent } from './enrollments/enrollments.component';
import { UpPostEnrollmentComponent } from './up-post-enrollment/up-post-enrollment.component';
import {BranchsService} from './service/branchs.service';
import {JobNameIdService} from './service/job-name-id.service';
import {SkillService} from './service/skill.service';
import {FormUploadService} from './service/form-upload.service';
import {ShiftOptionService} from './service/shift-option.service';
import {EnrollmentPostService} from './service/enrollment-post.service';
import {Select2Module} from 'ng2-select2';
import {ConvertTimePipe} from './pipe/convert-time.pipe';
import {UiSwitchModule} from 'angular2-ui-switch';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {UpOrEditService} from './service/up-or-edit.service';
import {JobIdService} from './service/job-id.service';
import {ChoosePostTypeService} from './service/choose-post-type.service';
import {DateAdapter, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {DateFormat} from './class/date-format';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    CooperateComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    BranchComponent,
    EnrollmentsComponent,
    UpPostEnrollmentComponent,
    ConvertTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAv-qHA_QShMFTK49_XOH5J5jiCiUZJgVs',
      libraries: ['places']
    }),
    Select2Module,
    UiSwitchModule,
    AmazingTimePickerModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    SignInService,
    BranchsService,
    JobNameIdService,
    SkillService,
    FormUploadService,
    ShiftOptionService,
    EnrollmentPostService,
    UpOrEditService,
    JobIdService,
    ChoosePostTypeService,
    { provide: DateAdapter, useClass: DateFormat },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }
}
