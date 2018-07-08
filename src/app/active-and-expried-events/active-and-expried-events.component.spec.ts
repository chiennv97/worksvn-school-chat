import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAndExpriedEventsComponent } from './active-and-expried-events.component';

describe('ActiveAndExpriedEventsComponent', () => {
  let component: ActiveAndExpriedEventsComponent;
  let fixture: ComponentFixture<ActiveAndExpriedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveAndExpriedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveAndExpriedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
