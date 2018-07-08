import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEnrollmentApplyComponent } from './tab-enrollment-apply.component';

describe('TabEnrollmentApplyComponent', () => {
  let component: TabEnrollmentApplyComponent;
  let fixture: ComponentFixture<TabEnrollmentApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEnrollmentApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEnrollmentApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
