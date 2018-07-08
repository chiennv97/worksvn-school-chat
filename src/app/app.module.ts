import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInService } from './service/sign-in.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
import { CooperateComponent } from './cooperate/cooperate.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { BranchComponent } from './branch/branch.component';
import {Select2Module} from 'ng2-select2';
import {EventService} from './service/event.service';

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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    Select2Module,
  ],
  providers: [
    SignInService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
