import {ModuleWithProviders, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { EventComponent } from './event.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { EventService } from '../service/event.service';
import { ActiveAndExpriedEventsComponent } from '../active-and-expried-events/active-and-expried-events.component';
import {Select2Module} from 'ng2-select2';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UiSwitchModule} from 'angular2-ui-switch';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {DateAdapter, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {DateFormat} from '../class/date-format';

const eventRoutes: Routes = [
  {
    path: 'events',
    component: EventComponent,
    children: [
      { path: 'create', component: CreateEventComponent },
      { path: 'active', component: ActiveAndExpriedEventsComponent },
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
    CreateEventComponent,
    EventComponent,
    ActiveAndExpriedEventsComponent,
  ],
  exports: [RouterModule],
  providers: [
    EventService,
    { provide: DateAdapter, useClass: DateFormat },
  ]
})
export class EventModule {}
