import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {EventService} from '../service/event.service';
import {Select2Module} from 'ng2-select2';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UiSwitchModule} from 'angular2-ui-switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DateAdapter, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {DateFormat} from '../class/date-format';
// const eventRoutes: Routes = [
//   {
//     path: 'events',
//     component: EventComponent,
//     children: [
//       { path: 'create', component: CreateEventComponent },
//       { path: 'active', component: ActiveAndExpriedEventsComponent },
//       { path: 'event-detial/:id', component: EventDetailComponent},
//     ]
//   }
// ];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RouterModule.forChild(eventRoutes),
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
    // EventComponent,
  ],
  exports: [RouterModule],
  providers: [
    EventService,
    { provide: DateAdapter, useClass: DateFormat },
  ]
})
export class EventModule {}
