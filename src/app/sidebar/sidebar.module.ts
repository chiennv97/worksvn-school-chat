import {ModuleWithProviders, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Select2Module} from 'ng2-select2';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UiSwitchModule} from 'angular2-ui-switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {
  DateAdapter,
  MatDatepickerModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule, MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule
} from '@angular/material';
import {DateFormat} from '../class/date-format';
import {SidebarComponent} from './sidebar.component';
import {ListEnrollmentsComponent} from '../list-enrollments/list-enrollments.component';
import {UpPostEnrollmentComponent} from '../up-post-enrollment/up-post-enrollment.component';
import {EnrollmentDetailComponent} from '../enrollment-detail/enrollment-detail.component';
import {CreateEventComponent} from '../create-event/create-event.component';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {ActiveAndExpriedEventsComponent} from '../active-and-expried-events/active-and-expried-events.component';
import {ManageCooperationComponent} from '../manage-cooperation/manage-cooperation.component';
import {BranchComponent} from '../branch/branch.component';
import {ManagerStudentComponent} from '../manager-student/manager-student.component';
import {ConvertTimePipe} from '../pipe/convert-time.pipe';
import {ConvertTimePipe2} from '../pipe/convert-time2.pipe';
import {ChatComponent} from '../chat/chat.component';
import {ProfileComponent} from '../profile/profile.component';
import {ChangePasswordComponent} from '../change-password/change-password.component';
import {HeaderComponent} from '../header/header.component';
import {ProfileEmployerComponent} from '../profile-employer/profile-employer.component';
import {ProfilePipe} from '../pipe/profile.pipe';
import {CandidateApplyComponent} from '../candidate-apply/candidate-apply.component';
import {IdentityCardPipe} from '../pipe/identity-card.pipe';
import {TabEnrollmentDetailComponent} from '../tab-enrollment-detail/tab-enrollment-detail.component';
import {TabEnrollmentApplyComponent} from '../tab-enrollment-apply/tab-enrollment-apply.component';
import {TruncatePipe} from '../pipe/truncate.pipe';
import {AgmCoreModule} from '@agm/core';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {environment} from '../../environments/environment';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
const eventRoutes: Routes = [
  {
    path: 'manage',
    component: SidebarComponent,
    children: [
      { path: 'events/post/:type', component: CreateEventComponent },
      { path: 'events/post/:type/:id', component: CreateEventComponent },
      { path: 'events/active', component: ActiveAndExpriedEventsComponent },
      { path: 'events/event-detial/:id', component: EventDetailComponent},
      { path: 'list-enrollments', component: ListEnrollmentsComponent},
      { path: 'up-post-enrollment/:type', component: UpPostEnrollmentComponent},
      { path: 'edit-post-enrollment/:type/:id', component: UpPostEnrollmentComponent},
      { path: 'enrollment-detail/:id', component: EnrollmentDetailComponent},
      { path: 'branchs', component: BranchComponent},
      { path: 'manage-student', component: ManagerStudentComponent},
      { path: 'manage-cooperation', component: ManageCooperationComponent},
      { path: 'chat/:roomid', component: ChatComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'change-password', component: ChangePasswordComponent},
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(eventRoutes),
    MatNativeDateModule,
    BrowserModule,
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
    MatSnackBarModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    UiSwitchModule,
    NgxPaginationModule,
    MatTabsModule,
    BrowserAnimationsModule,
    AmazingTimePickerModule,
    LoadingBarHttpClientModule,
    AngularFirestoreModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    SidebarComponent,
    ListEnrollmentsComponent,
    CreateEventComponent,
    ActiveAndExpriedEventsComponent,
    EventDetailComponent,
    ConvertTimePipe2,
    HeaderComponent,
    ProfileEmployerComponent,
    CandidateApplyComponent,
    ManagerStudentComponent,
    ManageCooperationComponent,
    TabEnrollmentDetailComponent,
    TabEnrollmentApplyComponent,
    UpPostEnrollmentComponent,
    ConvertTimePipe,
    TruncatePipe,
    ChatComponent,
    EnrollmentDetailComponent,
    ProfilePipe,
    IdentityCardPipe
  ],
  exports: [RouterModule],
  providers: [
    { provide: DateAdapter, useClass: DateFormat },
  ]
})
export class SidebarModule {}
