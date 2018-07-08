import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEnrollmentDetailComponent } from './tab-enrollment-detail.component';

describe('TabEnrollmentDetailComponent', () => {
  let component: TabEnrollmentDetailComponent;
  let fixture: ComponentFixture<TabEnrollmentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEnrollmentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEnrollmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
