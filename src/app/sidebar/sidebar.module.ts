import {ModuleWithProviders, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Select2Module} from 'ng2-select2';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UiSwitchModule} from 'angular2-ui-switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DateAdapter, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {DateFormat} from '../class/date-format';
import {SidebarComponent} from './sidebar.component';
import {ListEnrollmentsComponent} from '../list-enrollments/list-enrollments.component';
import {UpPostEnrollmentComponent} from '../up-post-enrollment/up-post-enrollment.component';
import {EnrollmentDetailComponent} from '../enrollment-detail/enrollment-detail.component';
import {CreateEventComponent} from '../create-event/create-event.component';
import {EventDetailComponent} from '../event-detail/event-detail.component';
import {ActiveAndExpriedEventsComponent} from '../active-and-expried-events/active-and-expried-events.component';
import {EventComponent} from '../event/event.component';
import {ConvertTimePipe} from '../pipe/convert-time.pipe';
import {ConvertTimePipe2} from '../pipe/convert-time2.pipe';
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

    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(eventRoutes),
    Select2Module,
    UiSwitchModule,
    NgxPaginationModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
  declarations: [
    SidebarComponent,
    ListEnrollmentsComponent,
    CreateEventComponent,
    ActiveAndExpriedEventsComponent,
    EventDetailComponent,
    ConvertTimePipe2
  ],
  exports: [RouterModule],
  providers: [
    { provide: DateAdapter, useClass: DateFormat },
  ]
})
export class SidebarModule {}
