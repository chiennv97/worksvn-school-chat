import {ModuleWithProviders, NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import { EventComponent } from './event.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { EventService } from '../service/event.service';
import { ActiveAndExpriedEventsComponent } from '../active-and-expried-events/active-and-expried-events.component';
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
// const Routing: ModuleWithProviders = RouterModule.forRoot(routesConfig,
//   { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled',
//     anchorScrolling: 'enabled'});
@NgModule({
  imports: [
    // JobDetailModule,
    // Routing,
    CommonModule,
    RouterModule.forChild(eventRoutes)
  ],
  declarations: [
    CreateEventComponent,
    EventComponent,
    ActiveAndExpriedEventsComponent,
  ],
  exports: [RouterModule],
  providers: [
    EventService,
  ]
})
export class EventModule {}
